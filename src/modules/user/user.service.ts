import { Injectable } from '@nestjs/common';
import { CreateUserDto, UserResponseDto } from '@modules/user/user.dto';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';


@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {
  }

  async getUser(email: string) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { email },
    });

    return plainToInstance(UserResponseDto, user);
  }

  async createUser(createUserDto: CreateUserDto) {
    const createdUser = instanceToPlain(createUserDto, { excludeExtraneousValues: true }) as Prisma.UserCreateInput;

    const user = await this.prisma.user.create({
      data: createdUser,
    })

    return plainToInstance(UserResponseDto, user);
  }

  async ensureUserExists(createUserDto: CreateUserDto) {
    const createdUser = instanceToPlain(createUserDto) as Prisma.UserCreateInput;

    const user = this.prisma.user.upsert({
      where: { email: createUserDto.email },
      create: createdUser,
      update: {},
    });

    return plainToInstance(UserResponseDto, user);
  }
}
