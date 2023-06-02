import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateMakeDto {
  @ApiProperty({
    example: 'Acura',
  })
  @IsString()
  value: string;
}

export class CreateModelDto {
  @ApiProperty({
    example: 'RDX',
  })
  @IsString()
  value: string;
}

export class CreateGenDto {
  @ApiProperty({
    example: '4',
  })
  @IsString()
  value: string;
}
