import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { StatisticController } from './statistic.controller';
import { StatisticService } from './statistic.service';
import { Ads } from '../ads/ads.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [StatisticController],
  providers: [StatisticService],
  imports: [SequelizeModule.forFeature([Ads]), AuthModule],
})
export class StatisticModule {}
