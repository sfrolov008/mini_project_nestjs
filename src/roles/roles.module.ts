import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { Role, UserRoles } from './roles.model';
import { User } from '../users/users.model';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [SequelizeModule.forFeature([Role, User, UserRoles])],
  exports: [RolesService],
})
export class RolesModule {}
