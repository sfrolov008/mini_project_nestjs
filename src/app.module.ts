import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import * as process from 'process';
import { ScheduleModule } from '@nestjs/schedule';

import { UsersModule } from './users/users.module';
import { User } from './users/users.model';
import { RolesModule } from './roles/roles.module';
import { Role, UserRoles } from './roles/roles.model';
import { AccountsModule } from './accounts/accounts.module';
import { Account, UserAccounts } from './accounts/accounts.model';
import { CarsModule } from './cars/cars.module';
import { CarGen, CarMake, CarModel } from './cars/car.model';
import { AdsModule } from './ads/ads.module';
import { Ads } from './ads/ads.model';
import { AdsStatus, AdsStatusAds } from './ads/ads-status.model';
import { AuthModule } from './auth/auth.module';
import { Token } from './auth/tokens/tokens.model';
import { MailModule } from './mail/mail.module';
import { LocationsModule } from './locations/locations.module';
import { City, Region } from './locations/locatons.model';
import { CurrencyModule } from './currency/currency.module';
import { Currency } from './currency/currency.model';
import { StatisticModule } from './statistic/statistic.module';
import { AwsModule } from './aws/aws.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ envFilePath: '.env' }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadModels: true,
      synchronize: true,
      models: [
        User,
        Role,
        UserRoles,
        Account,
        UserAccounts,
        CarMake,
        CarModel,
        CarGen,
        Region,
        City,
        Ads,
        AdsStatus,
        AdsStatusAds,
        Token,
        Currency,
      ],
    }),
    UsersModule,
    RolesModule,
    AccountsModule,
    CarsModule,
    AdsModule,
    AuthModule,
    MailModule,
    LocationsModule,
    CurrencyModule,
    StatisticModule,
    AwsModule,
  ],
})
export class AppModule {}
