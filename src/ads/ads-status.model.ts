import {
  BelongsToMany,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Ads } from './ads.model';

@Table({ tableName: 'ads_status', createdAt: false, updatedAt: false })
export class AdsStatus extends Model<AdsStatus> {
  @Default(DataType.UUIDV4)
  @PrimaryKey
  @Column({ type: DataType.UUID, allowNull: false })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  value: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @BelongsToMany(() => Ads, () => AdsStatusAds)
  ads: Ads[];
}

@Table({ tableName: 'adsStatus_ads', createdAt: false, updatedAt: false })
export class AdsStatusAds extends Model<AdsStatusAds> {
  @Default(DataType.UUIDV4)
  @PrimaryKey
  @Column({ type: DataType.UUID, allowNull: false })
  id: string;
  @ForeignKey(() => Ads)
  @Column({ type: DataType.STRING })
  adsId: string;
  @ForeignKey(() => AdsStatus)
  @Column({ type: DataType.STRING })
  statusId: string;
}
