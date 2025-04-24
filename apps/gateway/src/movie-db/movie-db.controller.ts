import { Controller, Get, Inject, Request } from '@nestjs/common';
import { MicroserviceRouteService } from '@@shared/services/microservice-route/microservice-route.service';
import { Request as RequestObject } from 'express';


@Controller('movies')
export class MovieDbController {
  constructor(@Inject('MOVIE-DB_MICROSERVICE') private readonly microserviceRoute: MicroserviceRouteService) {}

  @Get('popular')
  public async getMoviesPopular(@Request() request: RequestObject) {
    return await this.microserviceRoute.send({ cmd: 'get-movies-popular'}, request);
  }
}
