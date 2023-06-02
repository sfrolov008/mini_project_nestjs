import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { Request, Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateGenDto, CreateMakeDto, CreateModelDto } from './dto/car.dto';
import { CarGen, CarMake, CarModel } from './car.model';

@ApiTags('Cars')
@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  @ApiOperation({ summary: 'Create make "Acura"' })
  @ApiResponse({ status: 201, type: CarMake })
  @Post('/makes')
  async createMake(
    @Req() req: Request,
    @Res() res: Response,
    @Body() makeData: CreateMakeDto,
  ): Promise<Response<CarMake>> {
    return res
      .status(HttpStatus.CREATED)
      .json(await this.carsService.createMake(makeData));
  }

  @ApiOperation({ summary: 'Create model "RDX"' })
  @ApiResponse({ status: 201, type: CarModel })
  @Post('/makes/:makeId/models')
  async createModel(
    @Req() req: Request,
    @Res() res: Response,
    @Body() modelData: CreateModelDto,
  ): Promise<Response<CarModel>> {
    return res
      .status(HttpStatus.CREATED)
      .json(await this.carsService.createModel(modelData));
  }

  @ApiOperation({ summary: 'Create generation "4"' })
  @ApiResponse({ status: 201, type: CarGen })
  @Post('/models/:modelId/gens')
  async createGen(
    @Req() req: Request,
    @Res() res: Response,
    @Body() genData: CreateGenDto,
  ): Promise<Response<CarModel>> {
    return res
      .status(HttpStatus.CREATED)
      .json(await this.carsService.createGen(genData));
  }

  @ApiOperation({ summary: 'Get all makes []' })
  @ApiResponse({ status: 200, type: CarMake })
  @Get('/makes')
  async getAllMakes(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response<CarMake[]>> {
    return res.status(HttpStatus.OK).json(await this.carsService.getAllMakes());
  }

  @ApiOperation({ summary: 'Get all models []' })
  @ApiResponse({ status: 200, type: CarModel })
  @Get('/makes/:makeId/models')
  async getAllModels(
    @Req() req: Request,
    @Res() res: Response,
    @Param('makeId') makeId: string,
  ): Promise<Response<CarModel[]>> {
    return res
      .status(HttpStatus.OK)
      .json(await this.carsService.getAllModels(makeId));
  }

  @ApiOperation({ summary: 'Get all generations []' })
  @ApiResponse({ status: 200, type: CarGen })
  @Get('/models/:modelId/gens')
  async getAllGens(
    @Req() req: Request,
    @Res() res: Response,
    @Param('modelId') modelId: string,
  ): Promise<Response<CarGen[]>> {
    return res
      .status(HttpStatus.OK)
      .json(await this.carsService.getAllGens(modelId));
  }

  @ApiOperation({ summary: 'Get one make by ID' })
  @ApiResponse({ status: 200, type: CarMake })
  @Get('makes/:makeId')
  async getOneMake(
    @Req() req: Request,
    @Res() res: Response,
    @Param('makeId') makeId: string,
  ): Promise<Response<CarMake>> {
    return res
      .status(HttpStatus.OK)
      .json(await this.carsService.getOneMake(makeId));
  }

  @ApiOperation({ summary: 'Get one model by ID' })
  @ApiResponse({ status: 200, type: CarModel })
  @Get('models/:modelId')
  async getOneModel(
    @Req() req: Request,
    @Res() res: Response,
    @Param('modelId') modelId: string,
  ): Promise<Response<CarMake>> {
    return res
      .status(HttpStatus.OK)
      .json(await this.carsService.getOneModel(modelId));
  }
  @ApiOperation({ summary: 'Get one generation by ID' })
  @ApiResponse({ status: 200, type: CarGen })
  @Get('gens/:genId')
  async getOneGen(
    @Req() req: Request,
    @Res() res: Response,
    @Param('genId') genId: string,
  ): Promise<Response<CarMake>> {
    return res
      .status(HttpStatus.OK)
      .json(await this.carsService.getOneModel(genId));
  }
}
