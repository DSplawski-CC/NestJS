import { Controller, ParseIntPipe } from '@nestjs/common';
import { MovieDbService } from './movie-db.service';
import { MessagePattern } from '@nestjs/microservices';
import { PayloadQuery } from '@@shared/decorators/payload-extractor.decorator';


@Controller()
export class MovieDbController {
  constructor(private readonly movieDbService: MovieDbService) {}

  @MessagePattern({cmd: 'get-movies-popular'})
  public async getMoviesPopular(@PayloadQuery('page', new ParseIntPipe({ optional: true })) page?: number) {
    return await this.movieDbService.moviesPopular(page);
  }
}
