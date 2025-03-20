import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { Prisma } from '@prisma/client';


export class UserResponseDto implements Prisma.UserGetPayload<{}> {
  id: number;

  @MinLength(3)
  @MaxLength(10)
  name: string;

  @IsEmail()
  email: string;
}

export class CreateUserDto implements Prisma.UserCreateInput {
  @MinLength(3)
  @MaxLength(10)
  name: string;

  @IsEmail()
  email: string;
}