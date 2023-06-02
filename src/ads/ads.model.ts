import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { User } from '../users/users.model';
import { AdsStatus, AdsStatusAds } from './ads-status.model';
import { CarGen, CarMake, CarModel } from '../cars/car.model';
import { City, Region } from '../locations/locatons.model';
import { Currency } from '../currency/currency.model';

@Table({ tableName: 'ads' })
export class Ads extends Model<Ads> {
  @ApiProperty({
    example: 'f7476aee-a139-45c3-b731-6d8fd185e1b5',
    description: 'unique id',
  })
  @Default(DataType.UUIDV4)
  @PrimaryKey
  @Column({ type: DataType.UUID, allowNull: false })
  id: string;

  @ApiProperty({
    example: 'Car for sale',
    description: 'car....',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({
    example: '1000',
    description: 'car price',
  })
  @Column({ type: DataType.INTEGER, allowNull: false })
  price: number;
  @Column({ type: DataType.INTEGER, allowNull: true })
  priceEUR: number;
  @Column({ type: DataType.INTEGER, allowNull: true })
  priceUSD: number;

  @ApiProperty({
    example: 'Sale car ...',
    description: 'Car description',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @ApiProperty({
    example: 'box for photo links',
  })
  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
  photo: string[];

  @ApiProperty({
    description: 'Views of ads',
  })
  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  views: number;

  @ApiPropertyOptional({ type: () => [AdsStatus] })
  @BelongsToMany(() => AdsStatus, () => AdsStatusAds)
  status: AdsStatus[];

  @ApiPropertyOptional({ type: () => [User] })
  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  userId: string;

  @ApiPropertyOptional({ type: () => [User] })
  @BelongsTo(() => User)
  user: User;

  @ApiPropertyOptional({ type: () => [Region] })
  @ForeignKey(() => Region)
  @Column({ type: DataType.UUID, allowNull: false })
  regionId: string;

  @ApiPropertyOptional({ type: () => [Region] })
  @BelongsTo(() => Region)
  region: Region;

  @ApiPropertyOptional({ type: () => [City] })
  @ForeignKey(() => City)
  @Column({ type: DataType.UUID, allowNull: false })
  cityId: string;

  @ApiPropertyOptional({ type: () => [City] })
  @BelongsTo(() => City)
  city: City;

  @ApiPropertyOptional({ type: () => [CarMake] })
  @ForeignKey(() => CarMake)
  @Column({ type: DataType.UUID, allowNull: false })
  makeId: string;

  @ApiPropertyOptional({ type: () => [CarMake] })
  @BelongsTo(() => CarMake)
  make: CarMake;

  @ApiPropertyOptional({ type: () => [CarModel] })
  @ForeignKey(() => CarModel)
  @Column({ type: DataType.UUID, allowNull: false })
  modelId: string;

  @ApiPropertyOptional({ type: () => [CarModel] })
  @BelongsTo(() => CarModel)
  model: CarModel;

  @ApiPropertyOptional({ type: () => [CarGen] })
  @ForeignKey(() => CarGen)
  @Column({ type: DataType.UUID, allowNull: false })
  genId: string;

  @ApiPropertyOptional({ type: () => [CarGen] })
  @BelongsTo(() => CarGen)
  gen: CarGen;

  @ApiPropertyOptional({ type: () => [Currency] })
  @ForeignKey(() => Currency)
  @Column({ type: DataType.UUID, allowNull: false })
  currencyId: string;

  @ApiPropertyOptional({ type: () => [Currency] })
  @BelongsTo(() => Currency)
  currency: Currency;
}
