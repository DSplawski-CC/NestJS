import { Controller, Get, Inject, Post, Request } from '@nestjs/common';
import { MicroserviceRouteService } from '@@shared/services/microservice-route/microservice-route.service';
import { Request as RequestObject } from 'express';
import { UserResponseDto } from '@@shared/dto/user.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';


@Controller('user')
export class UsersController {
  constructor(@Inject('USER_MICROSERVICE') private readonly microserviceRoute: MicroserviceRouteService) {}

  @Get(':id')
  @ApiOkResponse({ type: UserResponseDto })
  public async getUser(@Request() request: RequestObject) {
    return await this.microserviceRoute.send({ cmd: 'get_user'}, request);
  }

  @Post()
  @ApiCreatedResponse({ type: UserResponseDto, description: 'User created successfully.' })
  public async createUser(@Request() request: RequestObject) {
    return await this.microserviceRoute.send({ cmd: 'create_user'}, request);
  }
}
