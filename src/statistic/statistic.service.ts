import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';

import { Ads } from '../ads/ads.model';
import { Op } from 'sequelize';
import { IStatistic } from './statistic.inteface';

@Injectable()
export class StatisticService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(Ads) private adsModel: typeof Ads,
  ) {}

  async getByAdsId(adsId: string): Promise<IStatistic> {
    const views = await this.getViews(adsId);
    const avPrices = await this.getAvPrices(adsId);
    return {
      viewsAll: views.viewsAll as number,
      viewsMonth: views.viewsMonth as number,
      viewsWeek: views.viewsWeek as number,
      viewsDay: views.viewsDay as number,
      avPriceCountry: avPrices.avPriceCountry as number,
      avPriceRegion: avPrices.avPriceRegion as number,
      avPriceCity: avPrices.avPriceCity as number,
    };
  }

  async getViews(adsId: string) {
    try {
      const currentDate = new Date();

      const oneDay = 24 * 60 * 60 * 1000;

      const dayInterval = new Date(currentDate.getTime() - oneDay);
      const weekInterval = new Date(currentDate.getTime() - 7 * oneDay);
      const monthInterval = new Date(currentDate.getTime() - 30 * oneDay);

      const ads = await this.adsModel.findByPk(adsId);

      const viewsAll = await this.adsModel.aggregate('views', 'sum', {
        where: { id: ads.id },
      });
      const viewsMonth = await this.adsModel.aggregate('views', 'sum', {
        where: {
          id: ads.id,
          createdAt: {
            [Op.gte]: monthInterval,
          },
        },
      });
      const viewsWeek = await this.adsModel.aggregate('views', 'sum', {
        where: {
          id: ads.id,
          createdAt: {
            [Op.gte]: weekInterval,
          },
        },
      });
      const viewsDay = await this.adsModel.aggregate('views', 'sum', {
        where: {
          id: ads.id,
          createdAt: {
            [Op.gte]: dayInterval,
          },
        },
      });

      return {
        viewsAll,
        viewsMonth,
        viewsWeek,
        viewsDay,
      };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAvPrices(adsId: string) {
    try {
      const ads = await this.adsModel.findByPk(adsId);

      const avPriceCountry = await this.adsModel.aggregate('price', 'avg', {
        where: {
          makeId: ads.makeId,
          modelId: ads.modelId,
          genId: ads.genId,
        },
      });
      const avPriceRegion = await this.adsModel.aggregate('price', 'avg', {
        where: {
          makeId: ads.makeId,
          modelId: ads.modelId,
          genId: ads.genId,
          regionId: ads.regionId,
        },
      });
      const avPriceCity = await this.adsModel.aggregate('price', 'avg', {
        where: {
          makeId: ads.makeId,
          modelId: ads.modelId,
          genId: ads.genId,
          regionId: ads.regionId,
          cityId: ads.cityId,
        },
      });
      return {
        avPriceCountry,
        avPriceRegion,
        avPriceCity,
      };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
