import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRegionDto {
  @ApiProperty({
    example: 'Kharkivska',
  })
  @IsString()
  value: string;
}
export class CreateCityDto {
  @ApiProperty({
    example: 'Kharkivska',
  })
  @IsString()
  value: string;
}
