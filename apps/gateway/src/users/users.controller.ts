import { Controller, Get, HttpCode, HttpStatus, Post, Request } from '@nestjs/common';
import { MicroserviceRouteService } from '@@shared/services/microservice-route/microservice-route.service';
import { Request as RequestObject } from 'express';


@Controller('user')
export class UsersController {
  constructor(private microserviceRoute: MicroserviceRouteService) {}

  @Get(':id')
  public async getUser(@Request() request: RequestObject) {
    return await this.microserviceRoute.send({ cmd: 'get_user'}, request);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createUser(@Request() request: RequestObject) {
    return await this.microserviceRoute.send({ cmd: 'create_user'}, request);
  }
}
