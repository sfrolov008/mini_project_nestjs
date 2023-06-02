import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length } from 'class-validator';

export class CreateAdsDto {
  @ApiProperty({
    example: 'Car for sale',
    description: 'car...',
  })
  @IsString({ message: 'should be a string' })
  @Length(1, 30)
  title: string;

  @ApiProperty({
    example: '1000',
    description: 'Car price',
  })
  @IsNumber()
  price: number;
  priceEUR?: number;
  priceUSD?: number;
  location: string;

  @ApiProperty({
    example: 'Sale car ...',
    description: 'Car description',
  })
  @IsString()
  @Length(1, 255)
  description: string;
  photo?: string[];
  makeId: string;
  modelId: string;
  genId: string;
  regionId: string;
  cityId: string;
}
