import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AdsService } from './ads.service';
import { Ads } from './ads.model';
import { CreateAdsDto } from './dto/create-ads.dto';
import { AdsStatusDto } from './dto/ads-status.dto';
import { AdsStatus } from './ads-status.model';
import { RolesGuard } from '../auth/guards/role-auth.guard';
import { Roles } from '../roles/decorators/role.decorator';
import { UpdateAdsDto } from './dto/update-ads.dto';

@ApiTags('Advertising')
@Controller('ads')
export class AdsController {
  constructor(private adsService: AdsService) {}

  @ApiOperation({ summary: 'Create ads' })
  @ApiResponse({ status: 201, type: Ads })
  @Post()
  async createAds(
    @Req() req: Request,
    @Res() res: Response,
    @Body() adsData: CreateAdsDto,
  ): Promise<Response<Ads>> {
    const authData = req.headers.authorization;
    return res
      .status(HttpStatus.CREATED)
      .json(await this.adsService.createAds(adsData, authData));
  }

  @ApiOperation({ summary: 'Get all ads' })
  @ApiResponse({ status: 200, type: [Ads] })
  @Get()
  async getAll(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response<Ads[]>> {
    return res.status(HttpStatus.OK).json(await this.adsService.getAll());
  }

  @ApiOperation({ summary: 'Get one ad by ID' })
  @ApiResponse({ status: 200, type: Ads })
  @Get('/:id')
  async getOne(
    @Res() res: Response,
    @Param('id') adsId: string,
  ): Promise<Response<Ads>> {
    return res.status(HttpStatus.OK).json(await this.adsService.getOne(adsId));
  }

  @ApiOperation({ summary: 'Update one ad by ID' })
  @ApiResponse({ status: 200, type: Ads })
  @Roles('SELLER, MANAGER, ADMIN')
  @UseGuards(RolesGuard)
  @Patch('/:id')
  async update(
    @Res() res: Response,
    @Param('id') adsId: string,
    @Body() adsData: UpdateAdsDto,
  ): Promise<Response<Ads>> {
    return res
      .status(HttpStatus.OK)
      .json(await this.adsService.update(adsData, adsId));
  }

  @ApiOperation({ summary: 'Delete one user by id' })
  @ApiResponse({ status: 200 })
  @Roles('SELLER, MANAGER, ADMIN')
  @UseGuards(RolesGuard)
  @Delete('/:id')
  async delete(
    @Res() res: Response,
    @Param('id') adsId: string,
  ): Promise<void> {
    await res.status(HttpStatus.OK).json(await this.adsService.delete(adsId));
  }

  @ApiOperation({ summary: 'Create ads status "ACTIVE, INACTIVE" ' })
  @ApiResponse({ status: 200 })
  // @Roles(' MANAGER, ADMIN')
  // @UseGuards(RolesGuard)
  @Post('/status')
  async createAdsStatus(
    @Req() req: Request,
    @Res() res: Response,
    @Body() statusData: AdsStatusDto,
  ): Promise<Response<AdsStatus>> {
    return res
      .status(HttpStatus.CREATED)
      .json(await this.adsService.createAdsStatus(statusData));
  }

  @ApiOperation({ summary: 'Upload photo' })
  // @ApiResponse({ status: 200 })
  // @Roles('SELLER, MANAGER, ADMIN')
  @UseGuards(RolesGuard)
  @Post('/:id/photo')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPhoto(
    @Res() res: Response,
    @Param('id') adsId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // new MaxFileSizeValidator({ maxSize: 10000 }),
          // new FileTypeValidator({ fileType: 'image/jpg' }),
          // new FileTypeValidator({ fileType: 'image/jpeg' }),
          // new FileTypeValidator({ fileType: 'image/png' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return res
      .status(HttpStatus.OK)
      .json(
        await this.adsService.addPhoto(adsId, file.originalname, file.buffer),
      );
  }
}
