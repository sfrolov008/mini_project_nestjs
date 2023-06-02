import { IsEmail, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'John',
    description: 'user name',
  })
  @IsString({ message: 'should be a string' })
  name: string;

  @ApiProperty({
    example: 'john@mail.com',
    description: 'user email',
  })
  @IsString({ message: 'incorrect email' })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '0501234567',
    description: 'user phone',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    example: 'Qwerty123',
    description: 'user password',
  })
  @IsString({ message: 'incorrect password' })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/)
  password: string;
}
