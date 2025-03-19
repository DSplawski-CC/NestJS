import { IsEmail, MaxLength, MinLength } from 'class-validator';


export class UserResponseDto {
  @MinLength(3)
  @MaxLength(10)
  name: string;

  @IsEmail()
  email: string;
}

export class CreateUserDto {
  @MinLength(3)
  @MaxLength(10)
  name: string;

  @IsEmail()
  email: string;
}