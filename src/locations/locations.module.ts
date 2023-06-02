import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { City, Region } from './locatons.model';
import { Ads } from '../ads/ads.model';

@Module({
  providers: [LocationsService],
  controllers: [LocationsController],
  imports: [SequelizeModule.forFeature([Region, City, Ads])],
})
export class LocationsModule {}
