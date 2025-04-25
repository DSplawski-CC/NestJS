import { Controller, Get, Inject, Request } from '@nestjs/common';
import {
  MicroServiceRequest,
  MicroserviceRouteService,
} from '@@shared/services/microservice-route/microservice-route.service';
import { Request as RequestObject } from 'express';
import { MovieResponse } from 'moviedb-promise';


@Controller('movies')
export class MovieReviewController {
  constructor(
    @Inject('MOVIE-REVIEW_MICROSERVICE') private readonly movieReviewMicroserviceRoute: MicroserviceRouteService,
    @Inject('MOVIE-DB_MICROSERVICE') private readonly movieDbMicroserviceRoute: MicroserviceRouteService,
  ) {}

  @Get('top')
  public async getTop(@Request() request: RequestObject) {
    const movies: { [movieId: number]: number} = await this.movieReviewMicroserviceRoute.send({ cmd: 'get-top' }, request);
    const movieIds = Object.keys(movies).map(movieId => Number(movieId));
    const movieDbRequest: MicroServiceRequest = {
      ...request,
      body: movieIds,
    };

    const movieDetails: MovieResponse[] = await this.movieDbMicroserviceRoute.send({ cmd: 'get-movies-info'}, movieDbRequest);

    return movieDetails.map((movie: MovieResponse) => ({ [movies[movie.id!]]: movie}))
  }
}
