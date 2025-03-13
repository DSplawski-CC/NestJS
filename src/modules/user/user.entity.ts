import { IsEmail } from 'class-validator';


export class UserEntity {
  name: string;
  @IsEmail()
  email: string;
}