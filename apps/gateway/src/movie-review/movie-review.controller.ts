import { Controller, Get, Request } from '@nestjs/common';
import { MicroserviceRouteService } from '@@shared/services/microservice-route/microservice-route.service';
import { Request as RequestObject } from 'express';


@Controller('movies')
export class MovieReviewController {
  constructor(private readonly microserviceRoute: MicroserviceRouteService) {}

  @Get('top')
  public async getTop(@Request() request: RequestObject) {
    return this.microserviceRoute.send({ cmd: 'get-top' }, request);
  }
}
