import { Injectable } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { PrismaClientProviderService } from '@@shared/services/prisma-client-provider/prisma-client-provider.service';
import { CreateUserDto, UserFullResponseDto, UserResponseDto } from '@@shared/dto/user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  constructor(private readonly prismaProvider: PrismaClientProviderService) {}

  private get prisma() {
    return this.prismaProvider.getClient();
  }

  async getUser(email: string) {
    return await this.prisma.user.findUniqueOrThrow({
      where: { email },
    }) as UserResponseDto;
  }

  async getFullUser(email: string) {
    return await this.prisma.user.findUniqueOrThrow({
      where: { email },
    }) as UserFullResponseDto;
  }

  async createUser(createUserDto: CreateUserDto) {
    const createdUser = instanceToPlain(createUserDto, { excludeExtraneousValues: true }) as Prisma.UserCreateInput;
    createdUser.password = await bcrypt.hash(createdUser.password, 10);

    return await this.prisma.user.create({
      data: createdUser,
    }) as UserResponseDto;
  }

  async ensureUserExists(createUserDto: CreateUserDto) {
    const createdUser = instanceToPlain(createUserDto) as Prisma.UserCreateInput;
    createdUser.password = await bcrypt.hash(createdUser.password, 10);

    return await this.prisma.user.upsert({
      where: { email: createUserDto.email },
      create: createdUser,
      update: {},
    }) as UserResponseDto;
  }
}
