import { IsString, Length } from 'class-validator';

export class AccountDto {
  @IsString()
  readonly userId: string;
  @IsString()
  @Length(1, 255)
  readonly value: string;
}
