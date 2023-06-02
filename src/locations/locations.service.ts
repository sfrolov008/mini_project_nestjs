import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { City, Region } from './locatons.model';
import { CreateCityDto, CreateRegionDto } from './dto/location.dto';

@Injectable()
export class LocationsService {
  constructor(
    @InjectModel(Region) private regionModel: typeof Region,
    @InjectModel(City) private cityModel: typeof City,
  ) {}

  async createRegion(regionData: CreateRegionDto): Promise<Region> {
    return this.regionModel.create(regionData);
  }

  async createCity(cityData: CreateCityDto): Promise<City> {
    return this.cityModel.create(cityData);
  }

  async getAllRegions(): Promise<Region[]> {
    return this.regionModel.findAll();
  }
  async getAllCities(): Promise<City[]> {
    return this.cityModel.findAll();
  }

  async getOneRegion(regionId: string): Promise<Region> {
    return this.regionModel.findOne({ where: { id: regionId } });
  }

  async getOneCity(cityId: string): Promise<City> {
    return this.cityModel.findOne({ where: { id: cityId } });
  }
}
