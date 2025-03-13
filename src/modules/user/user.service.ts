import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '@modules/user/user.entity';
import { CreateUserDto, UserResponseDto } from '@modules/user/user.dto';
import { plainToInstance } from 'class-transformer';


@Injectable()
export class UserService {
  private readonly users = new Map<string, UserEntity>([
    ['mike@mike.com', { name: 'Mike', email: 'mike@mike.com' }],
    ['jason@jason.com', {  name: 'Jason', email: 'jason@jason.com' }],
  ]);

  getUser(email: string) {
    if (!this.users.has(email)) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    const userEntity = this.users.get(email)!;
    return plainToInstance(UserResponseDto, userEntity);
  }

  addUser(user: CreateUserDto) {
    if (this.users.has(user.email)) {
      throw new ConflictException(`User with email ${user.email} not found`);
    }

    const userEntity = plainToInstance(UserEntity, user);
    this.users.set(userEntity.email, userEntity);

    return plainToInstance(UserResponseDto, userEntity);
  }
}
