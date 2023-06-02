import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { LocationsService } from './locations.service';
import { CreateCityDto, CreateRegionDto } from './dto/location.dto';
import { City, Region } from './locatons.model';

@ApiTags('Locations')
@Controller('locations')
export class LocationsController {
  constructor(private locationsService: LocationsService) {}

  @ApiOperation({ summary: 'Create region Kharkivska' })
  @ApiResponse({ status: 201, type: Region })
  @Post('/region')
  async createRegion(
    @Res() res: Response,
    @Body() regionData: CreateRegionDto,
  ): Promise<Response<Region>> {
    return res
      .status(HttpStatus.CREATED)
      .json(await this.locationsService.createRegion(regionData));
  }

  @ApiOperation({ summary: 'Create city Kharkiv' })
  @ApiResponse({ status: 201, type: City })
  @Post('/city')
  async createCity(
    @Res() res: Response,
    @Body() cityData: CreateCityDto,
  ): Promise<Response<City>> {
    return res
      .status(HttpStatus.CREATED)
      .json(await this.locationsService.createCity(cityData));
  }

  @ApiOperation({ summary: 'Get all regions []' })
  @ApiResponse({ status: 200, type: Region })
  @Get('/region')
  async getAllRegions(@Res() res: Response): Promise<Response<Region[]>> {
    return res
      .status(HttpStatus.OK)
      .json(await this.locationsService.getAllRegions());
  }

  @ApiOperation({ summary: 'Get all cities []' })
  @ApiResponse({ status: 200, type: City })
  @Get('/city')
  async getAllCities(@Res() res: Response): Promise<Response<City[]>> {
    return res
      .status(HttpStatus.OK)
      .json(await this.locationsService.getAllCities());
  }

  @ApiOperation({ summary: 'Get region by ID' })
  @ApiResponse({ status: 200, type: Region })
  @Get('/region/:regionId')
  async getOneRegion(
    @Res() res: Response,
    @Param('regionId') regionId: string,
  ): Promise<Response<Region>> {
    return res
      .status(HttpStatus.OK)
      .json(await this.locationsService.getOneRegion(regionId));
  }

  @ApiOperation({ summary: 'Get city by ID' })
  @ApiResponse({ status: 200, type: City })
  @Get('/city/:cityId')
  async getOneCity(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response<City>> {
    return res
      .status(HttpStatus.OK)
      .json(await this.locationsService.getOneCity(id));
  }
}
