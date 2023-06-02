import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesService } from '../roles/roles.service';
import { AccountsService } from '../accounts/accounts.service';
import { Role } from '../roles/roles.model';
import { Account } from '../accounts/accounts.model';
import { RoleDto } from './dto/role.dto';
import { AccountDto } from './dto/account.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private rolesService: RolesService,
    private accountsService: AccountsService,
  ) {}
  async create(userData: CreateUserDto): Promise<User> {
    try {
      const user = await this.userModel.create(userData);
      const role = await this.rolesService.findByValue('SELLER');
      const account = await this.accountsService.findByValue('BASE');
      await user.$set('roles', [role.id]);
      await user.$set('accounts', [account.id]);
      user.roles = [role];
      user.accounts = [account];
      return user;
    } catch (e) {
      console.log(e);
    }
  }
  async getAll(): Promise<User[]> {
    try {
      return this.userModel.findAll({
        include: [
          { model: Role, attributes: ['value'], through: { attributes: [] } },
          {
            model: Account,
            attributes: ['value'],
            through: { attributes: [] },
          },
        ],
      });
    } catch (e) {
      console.log(e);
    }
  }

  async getOne(userId: string): Promise<User> {
    try {
      return this.userModel.findOne({
        where: { id: userId },
        include: [
          { model: Role, attributes: ['value'], through: { attributes: [] } },
          {
            model: Account,
            attributes: ['value'],
            through: { attributes: [] },
          },
        ],
      });
    } catch (e) {
      console.log(e);
    }
  }
  async getByEmail(email: string): Promise<User> {
    try {
      return this.userModel.findOne({ where: { email } });
    } catch (e) {
      console.log(e);
    }
  }
  async update(
    userData: Partial<UpdateUserDto>,
    userId: string,
  ): Promise<User> {
    try {
      const [updatedRowsCount, [updatedUser]] = await this.userModel.update(
        userData,
        {
          where: { id: userId },
          returning: true,
        },
      );
      if (updatedRowsCount === 0) {
        throw new NotFoundException(`!User with ID ${userId} not found`);
      }
      return updatedUser;
    } catch (e) {}
  }

  async delete(userId: string): Promise<void> {
    try {
      await this.userModel.destroy({ where: { id: userId } });
    } catch (e) {
      console.log(e);
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      return this.userModel.findOne({ where: { email } });
    } catch (e) {
      console.log(e);
    }
  }

  async addRole(roleData: RoleDto) {
    const user = await this.userModel.findByPk(roleData.userId);
    const role = await this.rolesService.findByValue(roleData.value);
    if (role && user) {
      await user.$add('role', role.id);

      return roleData;
    }
    throw new HttpException('!User or Role not found', HttpStatus.NOT_FOUND);
  }

  async addAccount(accountData: AccountDto) {
    const user = await this.userModel.findByPk(accountData.userId);
    const account = await this.accountsService.findByValue(accountData.value);
    if (account && user) {
      await user.$add('account', account.id);

      return accountData;
    }
    throw new HttpException('!User or Account not found', HttpStatus.NOT_FOUND);
  }
}
