import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { CarGen, CarMake, CarModel } from './car.model';
import { Ads } from '../ads/ads.model';

@Module({
  controllers: [CarsController],
  providers: [CarsService],
  imports: [SequelizeModule.forFeature([CarMake, CarModel, CarGen, Ads])],
  exports: [CarsService],
})
export class CarsModule {}
