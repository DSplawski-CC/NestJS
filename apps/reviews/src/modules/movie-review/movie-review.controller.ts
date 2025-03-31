import { Controller, ParseIntPipe } from '@nestjs/common';
import { MovieReviewService } from './movie-review.service';
import { MessagePattern } from '@nestjs/microservices';
import { PayloadQuery } from '@@shared/decorators/payload-extractor.decorator';


@Controller()
export class MovieReviewController {
  constructor(private readonly movieService: MovieReviewService) {}

  @MessagePattern({cmd: 'get-top'})
  public async getTop(@PayloadQuery('count', new ParseIntPipe({ optional: true })) count?: number) {
    return this.movieService.getTopMoviesIdsByRating(count);
  }
}
