import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Account } from './accounts.model';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountsService {
  constructor(@InjectModel(Account) private accountModel: typeof Account) {}

  async create(roleData: CreateAccountDto): Promise<Account> {
    return this.accountModel.create(roleData);
  }

  async findByValue(value: string): Promise<Account> {
    return this.accountModel.findOne({ where: { value: value.toUpperCase() } });
  }

  async delete(value: string): Promise<void> {
    await this.accountModel.destroy({ where: { value } });
  }
}
