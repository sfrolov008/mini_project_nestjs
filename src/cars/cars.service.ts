import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CarGen, CarMake, CarModel } from './car.model';
import { CreateGenDto, CreateMakeDto, CreateModelDto } from './dto/car.dto';

@Injectable()
export class CarsService {
  constructor(
    @InjectModel(CarMake) private carMakeModel: typeof CarMake,
    @InjectModel(CarModel) private carModelModel: typeof CarModel,
    @InjectModel(CarGen) private carGenModel: typeof CarGen,
  ) {}

  async createMake(makeData: CreateMakeDto): Promise<CarMake> {
    return this.carMakeModel.create(makeData);
  }

  async createModel(modelData: CreateModelDto): Promise<CarModel> {
    return this.carModelModel.create(modelData);
  }
  async createGen(genData: CreateGenDto): Promise<CarGen> {
    return this.carGenModel.create(genData);
  }

  async getAllMakes(): Promise<CarMake[]> {
    return this.carMakeModel.findAll();
  }

  async getAllModels(makeId: string): Promise<CarModel[]> {
    return this.carModelModel.findAll({ where: { makeId } });
  }

  async getAllGens(modelId: string): Promise<CarGen[]> {
    return this.carGenModel.findAll({ where: { modelId } });
  }

  async getOneMake(makeId: string): Promise<CarMake> {
    return this.carMakeModel.findOne({ where: { id: makeId } });
  }

  async getOneModel(modelId: string): Promise<CarModel> {
    return this.carModelModel.findOne({ where: { id: modelId } });
  }

  async getOneGen(genId: string): Promise<CarModel> {
    return this.carModelModel.findOne({ where: { id: genId } });
  }
}
