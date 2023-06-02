import { InjectModel } from '@nestjs/sequelize';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as Filter from 'bad-words';

import { Ads } from './ads.model';
import { AdsStatus } from './ads-status.model';
import { CreateAdsDto } from './dto/create-ads.dto';
import { AdsStatusDto } from './dto/ads-status.dto';
import { CarGen, CarMake, CarModel } from '../cars/car.model';
import { User } from '../users/users.model';
import { MailService } from '../mail/mail.service';
import { CurrencyService } from '../currency/currency.service';
import { UpdateAdsDto } from './dto/update-ads.dto';
import { AwsService } from '../aws/aws.service';
import { MailTemplate } from '../mail/mail.interface';

@Injectable()
export class AdsService {
  constructor(
    @InjectModel(Ads) private adsModel: typeof Ads,
    @InjectModel(AdsStatus) private adsStatusModel: typeof AdsStatus,
    @InjectModel(CarMake) private carMakeModel: typeof CarMake,
    @InjectModel(CarModel) private carModelModel: typeof CarModel,
    @InjectModel(CarGen) private carGenModel: typeof CarGen,
    @InjectModel(User) private userModel: typeof User,
    private currencyService: CurrencyService,
    private jwtService: JwtService,
    private mailService: MailService,
    private awsService: AwsService,
  ) {}

  async createAds(adsData: CreateAdsDto, authData: string) {
    const { makeId, modelId, genId, regionId, cityId, price, ...otherData } =
      adsData;
    const token = this.jwtService.verify(authData.split(' ')[1]);

    const adsCount = await this.adsModel.count({
      where: { userId: token.id },
    });
    const premium = token.accounts.includes('PREMIUM');
    if (!premium && adsCount === 1) {
      await this.mailService.send(
        token.email,
        'Offer to buy premium account',
        MailTemplate.OFFER,
      );
      throw new HttpException('!Unavailable for BASE', HttpStatus.FORBIDDEN);
    }
    const [currency] = await this.currencyService.getAllNew();
    const ads = await this.adsModel.create({
      ...otherData,
      userId: token.id,
      makeId: makeId,
      modelId: modelId,
      genId: genId,
      regionId: regionId,
      cityId: cityId,
      price: price,
      priceEUR: Math.round(price / currency.EUR),
      priceUSD: Math.round(price / currency.USD),
      currencyId: currency.id,
    });
    const isProfane = await this.filter(ads.id);
    if (isProfane) {
      const status = await this.adsStatusModel.findOne({
        where: { value: 'INACTIVE' },
      });
      if (status) {
        await ads.$set('status', [status.id]);
        ads.status = [status];
      }
      throw new HttpException(
        'The ads contains profanity',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } else {
      const status = await this.adsStatusModel.findOne({
        where: { value: 'ACTIVE' },
      });
      if (status) {
        await ads.$set('status', [status.id]);
        ads.status = [status];
      }
    }
    return ads;
  }

  async getAll(): Promise<Ads[]> {
    try {
      return this.adsModel.findAll({
        include: [
          {
            model: AdsStatus,
            attributes: ['value'],
            through: { attributes: [] },
          },
        ],
      });
    } catch (e) {
      console.log(e);
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getOne(adsId: string): Promise<Ads> {
    try {
      const ads = await this.adsModel.findByPk(adsId);
      if (ads) {
        ads.views += 1;
        await ads.save();
      }
      return ads;
    } catch (e) {
      console.log(e);
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(adsData: Partial<UpdateAdsDto>, adsId: string): Promise<Ads> {
    try {
      const [updatedRowsCount, [updatedAds]] = await this.adsModel.update(
        adsData,
        {
          where: { id: adsId },
          returning: true,
        },
      );
      if (updatedRowsCount === 0) {
        throw new NotFoundException(`!Ads with ID ${adsId} not found`);
      }
      return updatedAds;
    } catch (e) {
      console.log(e);
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(adsId: string): Promise<void> {
    try {
      await this.adsModel.destroy({ where: { id: adsId } });
    } catch (e) {
      console.log(e);
    }
  }

  async addPhoto(adsId: string, fileName: string, file: Buffer) {
    try {
      const ads = await this.adsModel.findByPk(adsId);
      const photoUrl = await this.awsService.uploadPhoto(fileName, file);
      console.log(photoUrl);
      if (ads) {
        ads.photo.push(photoUrl);
        await ads.save();
        return ads;
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async createAdsStatus(statusData: AdsStatusDto): Promise<AdsStatus> {
    return this.adsStatusModel.create(statusData);
  }
  private async filter(adsId: string): Promise<boolean> {
    const ads = await this.adsModel.findByPk(adsId);
    const filter = new Filter();
    return filter.isProfane(ads.description);
  }
}
