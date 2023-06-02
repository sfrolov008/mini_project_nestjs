import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Role } from './roles.model';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleModel: typeof Role) {}

  async create(roleData: CreateRoleDto): Promise<Role> {
    return this.roleModel.create(roleData);
  }

  async findByValue(value: string): Promise<Role> {
    return this.roleModel.findOne({ where: { value: value.toUpperCase() } });
  }

  async delete(value: string): Promise<void> {
    await this.roleModel.destroy({ where: { value } });
  }
}
