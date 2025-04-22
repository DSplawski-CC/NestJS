import { Controller, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '@@shared/dto/user.dto';
import { MessagePattern } from '@nestjs/microservices';
import { PayloadBody, PayloadParam } from '@@shared/decorators/payload-extractor.decorator';
import { PrismaRpcExceptionInterceptor } from '@@shared/interceptors/prisma-rpc-exception.interceptor';


@Controller()
@UseInterceptors(PrismaRpcExceptionInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'get_user' })
  public async getUser(@PayloadParam('id') id: string) {
    return await this.userService.getUser(id);
  }

  @MessagePattern({ cmd: 'create_user' })
  public async createUser(@PayloadBody() user: CreateUserDto) {
    return await this.userService.createUser(user);
  }
}
