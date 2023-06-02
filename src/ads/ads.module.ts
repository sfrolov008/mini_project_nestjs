import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AdsController } from './ads.controller';
import { AdsService } from './ads.service';
import { Ads } from './ads.model';
import { CarGen, CarMake, CarModel } from '../cars/car.model';
import { User } from '../users/users.model';
import { AdsStatus, AdsStatusAds } from './ads-status.model';
import { AuthModule } from '../auth/auth.module';
import { MailModule } from '../mail/mail.module';
import { City, Region } from '../locations/locatons.model';
import { Currency } from '../currency/currency.model';
import { CurrencyModule } from '../currency/currency.module';
import { AwsModule } from '../aws/aws.module';

@Module({
  controllers: [AdsController],
  providers: [AdsService],
  imports: [
    SequelizeModule.forFeature([
      Ads,
      AdsStatus,
      AdsStatusAds,
      CarMake,
      CarModel,
      CarGen,
      User,
      CarMake,
      CarModel,
      CarGen,
      Region,
      City,
      Currency,
    ]),
    AuthModule,
    MailModule,
    CurrencyModule,
    AwsModule,
  ],
  exports: [AdsService],
})
export class AdsModule {}
