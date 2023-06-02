import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches } from 'class-validator';

export class RegistrationDto {
  @ApiProperty({
    example: 'John',
    description: 'user name',
  })
  @IsString({ message: 'should be a string' })
  name: string;

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

export class LoginDto {
  @IsString({ message: 'incorrect email' })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Qwerty123',
    description: 'user password',
  })
  @IsString({ message: 'incorrect password' })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/)
  password: string;
}
