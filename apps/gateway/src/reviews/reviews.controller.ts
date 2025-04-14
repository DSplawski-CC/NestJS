import { Controller, Get, HttpCode, HttpStatus, Inject, Post, Request } from '@nestjs/common';
import { Request as RequestObject } from 'express';
import { MicroserviceRouteService } from '@@shared/services/microservice-route/microservice-route.service';


@Controller('movies/:movieId/reviews')
export class ReviewsController {
  constructor(@Inject('REVIEW_MICROSERVICE') private readonly microserviceRoute: MicroserviceRouteService) {}

  @Get()
  async getReviews(@Request() request: RequestObject) {
    return this.microserviceRoute.send({ cmd: 'get_reviews' }, request);
  }

  @Get(':reviewId')
  async getReview(@Request() request: RequestObject) {
    return this.microserviceRoute.send({ cmd: 'get_review' }, request);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createReview(@Request() request: RequestObject) {
    return this.microserviceRoute.send({ cmd: 'create_review' }, request);
  }
}
