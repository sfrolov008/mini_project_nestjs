import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    example: '[CUSTOMER, SELLER, MANAGER, ADMIN]',
  })
  @IsString()
  value: string;

  @ApiProperty({
    description: ' Role description',
  })
  @IsString()
  @Length(1, 255)
  description: string;
}
