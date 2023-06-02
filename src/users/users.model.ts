import {
  BelongsToMany,
  Column,
  DataType,
  Default,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Role, UserRoles } from '../roles/roles.model';
import { Account, UserAccounts } from '../accounts/accounts.model';
import { Ads } from '../ads/ads.model';
import { Token } from '../auth/tokens/tokens.model';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @ApiProperty({
    example: 'f7476aee-a139-45c3-b731-6d8fd185e1b5',
    description: 'unique id',
  })
  @Default(DataType.UUIDV4)
  @PrimaryKey
  @Column({ type: DataType.UUID, allowNull: false })
  id: string;

  @ApiProperty({
    example: 'John',
    description: 'user name',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({
    example: 'john@mail.com',
    description: 'user email',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({
    example: '0501234567',
    description: 'user phone',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  phone: string;

  @ApiProperty({
    example: 'Qwerty123',
    description: 'user password',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiPropertyOptional({ type: () => [Role] })
  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @ApiPropertyOptional({ type: () => [Account] })
  @BelongsToMany(() => Account, () => UserAccounts)
  accounts: Account[];

  @ApiPropertyOptional({ type: () => [Ads] })
  @HasMany(() => Ads)
  ads: Ads[];

  @ApiPropertyOptional({ type: () => Token })
  @HasOne(() => Token)
  tokens: Token;
}
