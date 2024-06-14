import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import { EmailMustBeUnique, UsernameMustBeUnique } from '../user.custom.validation';

export class RegisterUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Validate(EmailMustBeUnique)
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Validate(UsernameMustBeUnique)
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
