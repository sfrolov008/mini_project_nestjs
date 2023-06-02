import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';
import { RolesService } from './roles.service';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({ summary: 'Create role [CUSTOMER, SELLER, MANAGER, ADMIN]' })
  @ApiResponse({ status: 201, type: Role })
  @Post()
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() roleData: CreateRoleDto,
  ): Promise<Response<Role>> {
    return res
      .status(HttpStatus.CREATED)
      .json(await this.rolesService.create(roleData));
  }

  @ApiOperation({ summary: 'Get role by value' })
  @ApiResponse({ status: 200, type: Role })
  @Get('/:value')
  async findByValue(
    @Req() req: Request,
    @Res() res: Response,
    @Param('value') value: string,
  ): Promise<Response<Role>> {
    return res
      .status(HttpStatus.OK)
      .json(await this.rolesService.findByValue(value));
  }

  @ApiOperation({ summary: 'Get role by value' })
  @ApiResponse({ status: 200, type: Role })
  @Delete('/:value')
  async delete(
    @Req() req: Request,
    @Res() res: Response,
    @Param('value') value: string,
  ): Promise<void> {
    res.status(HttpStatus.OK).json(await this.rolesService.delete(value));
  }
}
