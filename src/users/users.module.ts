import { forwardRef, Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { RolesModule } from '../roles/roles.module';
import { AccountsModule } from '../accounts/accounts.module';
import { Role, UserRoles } from '../roles/roles.model';
import { Account, UserAccounts } from '../accounts/accounts.model';
import { Ads } from '../ads/ads.model';
import { Token } from '../auth/tokens/tokens.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([
      User,
      Role,
      UserRoles,
      Account,
      UserAccounts,
      Ads,
      Token,
    ]),
    RolesModule,
    AccountsModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
