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

import { User } from '../users/users.model';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Table({ tableName: 'accounts', createdAt: false, updatedAt: false })
export class Account extends Model<Account> {
  @ApiProperty({
    example: 'f7476aee-a139-45c3-b731-6d8fd185e1b5',
    description: 'unique id',
  })
  @Default(DataType.UUIDV4)
  @PrimaryKey
  @Column({ type: DataType.UUID, allowNull: false })
  id: string;

  @ApiProperty({
    example: '[BASE, PREMIUM]',
    description: 'account value',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  value: string;

  @ApiProperty({
    example: 'Manager account',
    description: 'account description',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @ApiPropertyOptional({ type: () => [User] })
  @BelongsToMany(() => User, () => UserAccounts)
  users: User[];
}

@Table({ tableName: 'user_accounts', createdAt: false, updatedAt: false })
export class UserAccounts extends Model<UserAccounts> {
  @Default(DataType.UUIDV4)
  @PrimaryKey
  @Column({ type: DataType.UUID, allowNull: false })
  id: string;
  @ForeignKey(() => User)
  @Column({ type: DataType.STRING })
  userId: string;
  @ForeignKey(() => Account)
  @Column({ type: DataType.STRING })
  accountId: string;
}
