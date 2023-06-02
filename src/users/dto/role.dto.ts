import { IsString, Length } from 'class-validator';

export class RoleDto {
  @IsString()
  readonly userId: string;
  @IsString()
  @Length(1, 255)
  readonly value: string;
}
