import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length } from 'class-validator';

export class UpdateAdsDto {
  @ApiProperty({
    example: 'John',
    description: 'user name',
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

  @ApiProperty({
    example: 'Sale car ...',
    description: 'Car description',
  })
  @IsString()
  @Length(1, 255)
  description: string;
  photo?: string[];
}
