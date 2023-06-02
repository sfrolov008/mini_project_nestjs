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
import { Request, Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateRoleDto } from '../roles/dto/create-role.dto';
import { AccountsService } from './accounts.service';
import { Account } from './accounts.model';

@ApiTags('Accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  @ApiOperation({ summary: 'Create account [BASE, PREMIUM]' })
  @ApiResponse({ status: 201, type: Account })
  @Post()
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() roleData: CreateRoleDto,
  ): Promise<Response<Account>> {
    return res
      .status(HttpStatus.CREATED)
      .json(await this.accountsService.create(roleData));
  }

  @ApiOperation({ summary: 'Get acoount by value' })
  @ApiResponse({ status: 200, type: Account })
  @Get('/:value')
  async findByValue(
    @Req() req: Request,
    @Res() res: Response,
    @Param('value') value: string,
  ): Promise<Response<Account>> {
    return res
      .status(HttpStatus.OK)
      .json(await this.accountsService.findByValue(value));
  }

  @ApiOperation({ summary: 'Get account by value' })
  @ApiResponse({ status: 200, type: Account })
  @Delete('/:value')
  async delete(
    @Req() req: Request,
    @Res() res: Response,
    @Param('value') value: string,
  ): Promise<void> {
    res.status(HttpStatus.OK).json(await this.accountsService.delete(value));
  }
}
