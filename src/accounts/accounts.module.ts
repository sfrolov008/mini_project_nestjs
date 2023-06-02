import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { User } from '../users/users.model';
import { Account, UserAccounts } from './accounts.model';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService],
  imports: [SequelizeModule.forFeature([Account, User, UserAccounts])],
  exports: [AccountsService],
})
export class AccountsModule {}
