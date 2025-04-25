import { Controller, ParseIntPipe } from '@nestjs/common';
import { MovieDbService } from './movie-db.service';
import { MessagePattern } from '@nestjs/microservices';
import { PayloadBody, PayloadParam, PayloadQuery } from '@@shared/decorators/payload-extractor.decorator';


@Controller()
export class MovieDbController {
  constructor(private readonly movieDbService: MovieDbService) {}

  @MessagePattern({cmd: 'get-movies-popular'})
  public async getMoviesPopular(@PayloadQuery('page', new ParseIntPipe({ optional: true })) page?: number) {
    return await this.movieDbService.moviesPopular(page);
  }

  @MessagePattern({cmd: 'get-movie-info'})
  public async getMovie(@PayloadParam('movieId', new ParseIntPipe()) movieId: number) {
    return await this.movieDbService.getMovie(movieId);
  }

  @MessagePattern({cmd: 'get-movies-info'})
  public async getMovies(@PayloadBody() movieIds: number[]) {
    return await this.movieDbService.getMovies(...movieIds);
  }
}
