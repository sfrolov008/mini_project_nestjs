import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateAccountDto {
  @ApiProperty({
    example: '[BASE, PREMIUM]',
  })
  @IsString()
  value: string;

  @ApiProperty({
    description: ' Account description',
  })
  @IsString()
  @Length(1, 255)
  description: string;
}
