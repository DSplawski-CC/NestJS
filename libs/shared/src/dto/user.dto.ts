import { IsEmail, IsNotEmpty, IsStrongPassword, MaxLength, MinLength } from 'class-validator';
import { Prisma } from '@prisma/client';


export class UserResponseDto implements Prisma.UserGetPayload<{ omit: { password: true } }> {
  id: number;

  @MinLength(3)
  @MaxLength(10)
  name: string;

  @IsEmail()
  email: string;
}

export class UserFullResponseDto implements Prisma.UserGetPayload<{}> {
  id: number;

  @MinLength(3)
  @MaxLength(10)
  name: string;

  @IsEmail()
  email: string;

  password: string;
}

export class CreateUserDto implements Prisma.UserCreateInput {
  @MinLength(3)
  @MaxLength(10)
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minSymbols: 1,
    minLowercase: 1,
    minUppercase: 1,
  })
  password: string;
}