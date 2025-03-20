import { Injectable } from '@nestjs/common';
import { CreateUserDto, UserResponseDto } from '@modules/user/user.dto';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { PrismaClientProviderService } from '@core/services/prisma-client-provider/prisma-client-provider.service';


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

  async createUser(createUserDto: CreateUserDto) {
    const createdUser = instanceToPlain(createUserDto, { excludeExtraneousValues: true }) as Prisma.UserCreateInput;

    return await this.prisma.user.create({
      data: createdUser,
    }) as UserResponseDto;
  }

  async ensureUserExists(createUserDto: CreateUserDto) {
    const createdUser = instanceToPlain(createUserDto) as Prisma.UserCreateInput;

    return await this.prisma.user.upsert({
      where: { email: createUserDto.email },
      create: createdUser,
      update: {},
    }) as UserResponseDto;
  }
}
