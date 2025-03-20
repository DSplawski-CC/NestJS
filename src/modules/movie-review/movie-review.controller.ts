import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { MovieReviewService } from '@modules/movie-review/movie-review.service';


@Controller('movies')
export class MovieReviewController {

  constructor(private readonly movieService: MovieReviewService) {}

  @Get('top')
  public async getTop(@Query('count', new ParseIntPipe({ optional: true })) count?: number) {
    return this.movieService.getTopMoviesIdsByRating(count);
  }
}
