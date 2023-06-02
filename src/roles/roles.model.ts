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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { User } from '../users/users.model';

@Table({ tableName: 'roles', createdAt: false, updatedAt: false })
export class Role extends Model<Role> {
  @ApiProperty({
    example: 'f7476aee-a139-45c3-b731-6d8fd185e1b5',
    description: 'unique id',
  })
  @Default(DataType.UUIDV4)
  @PrimaryKey
  @Column({ type: DataType.UUID, allowNull: false })
  id: string;

  @ApiProperty({
    example: '[CUSTOMER, SELLER, MANAGER, ADMIN]',
    description: 'role value',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  value: string;

  @ApiProperty({
    example: 'Manager role',
    description: 'role description',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;
  @ApiPropertyOptional({ type: () => [User] })
  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}

@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles> {
  @Default(DataType.UUIDV4)
  @PrimaryKey
  @Column({ type: DataType.UUID, allowNull: false })
  id: string;
  @ForeignKey(() => User)
  @Column({ type: DataType.STRING })
  userId: string;
  @ForeignKey(() => Role)
  @Column({ type: DataType.STRING })
  roleId: string;
}
