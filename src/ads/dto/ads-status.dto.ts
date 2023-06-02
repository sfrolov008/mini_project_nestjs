import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class AdsStatusDto {
  @ApiProperty({
    example: '[ACTIVE, INACTIVE]',
  })
  @IsString()
  value: string;

  @ApiProperty({
    description: ' Status description',
  })
  @IsString()
  @Length(1, 255)
  description: string;
}
