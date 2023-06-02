import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { CurrencyService } from './currency.service';
import { Currency } from './currency.model';
import { Ads } from '../ads/ads.model';
import { AuthModule } from '../auth/auth.module';
import { CurrencyController } from './currency.controller';

@Module({
  imports: [SequelizeModule.forFeature([Currency, Ads]), AuthModule],
  providers: [CurrencyService],
  controllers: [CurrencyController],
  exports: [CurrencyService],
})
export class CurrencyModule {}
