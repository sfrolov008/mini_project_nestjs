import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/role-auth.guard';
import { Roles } from '../roles/decorators/role.decorator';

import { UsersService } from './users.service';
import { User } from './users.model';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { RoleDto } from './dto/role.dto';
import { AccountDto } from './dto/account.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, type: User })
  // @Roles('MANAGER, ADMIN')
  // @UseGuards(RolesGuard)
  @Post()
  async create(
    @Res() res: Response,
    @Body() userData: CreateUserDto,
  ): Promise<Response<User>> {
    return res
      .status(HttpStatus.CREATED)
      .json(await this.usersService.create(userData));
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  // @Roles('MANAGER ,ADMIN')
  // @UseGuards(RolesGuard)
  @Get()
  async getAll(@Res() res: Response): Promise<Response<User[]>> {
    return res.status(HttpStatus.OK).json(await this.usersService.getAll());
  }

  @ApiOperation({ summary: 'Get one user by id' })
  @ApiResponse({ status: 200, type: User })
  // @Roles('MANAGER ,ADMIN')
  // @UseGuards(RolesGuard)
  @Get('/:id')
  async getOne(
    @Res() res: Response,
    @Param('id') userId: string,
  ): Promise<Response<User>> {
    return res
      .status(HttpStatus.OK)
      .json(await this.usersService.getOne(userId));
  }

  @ApiOperation({ summary: 'Update one user by id' })
  @ApiResponse({ status: 200, type: User })
  // @Roles('SELLER, MANAGER ,ADMIN')
  // @UseGuards(RolesGuard)
  @Patch('/:id')
  async update(
    @Res() res: Response,
    @Param('id') userId: string,
    @Body() userData: UpdateUserDto,
  ): Promise<Response<User>> {
    return res
      .status(HttpStatus.OK)
      .json(await this.usersService.update(userData, userId));
  }

  @ApiOperation({ summary: 'Delete one user by id' })
  @ApiResponse({ status: 200 })
  // @Roles('MANAGER ,ADMIN')
  // @UseGuards(RolesGuard)
  @Delete('/:id')
  async delete(
    @Res() res: Response,
    @Param('id') userId: string,
  ): Promise<void> {
    res.status(HttpStatus.OK).json(await this.usersService.delete(userId));
  }

  @ApiOperation({ summary: 'Set role (only for manager and admin)' })
  @ApiResponse({ status: 200 })
  // @Roles('MANAGER ,ADMIN')
  // @UseGuards(RolesGuard)
  @Post('/role')
  async addRole(@Res() res: Response, @Body() roleData: RoleDto) {
    return res
      .status(HttpStatus.OK)
      .json(await this.usersService.addRole(roleData));
  }

  @ApiOperation({ summary: 'Set account (only for manager and admin)' })
  @ApiResponse({ status: 200 })
  // @Roles('MANAGER ,ADMIN')
  // @UseGuards(RolesGuard)
  @Post('/account')
  async addAccount(@Res() res: Response, @Body() accountData: AccountDto) {
    return res
      .status(HttpStatus.OK)
      .json(await this.usersService.addAccount(accountData));
  }
}
