import { IsEmail } from 'class-validator';


export class UserResponseDto {
  name: string;
  @IsEmail()
  email: string;
}

export class CreateUserDto {
  name: string;
  @IsEmail()
  email: string;
}