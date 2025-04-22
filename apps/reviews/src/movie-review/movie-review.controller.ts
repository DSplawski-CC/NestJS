import { Controller, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { MovieReviewService } from './movie-review.service';
import { MessagePattern } from '@nestjs/microservices';
import { PayloadQuery } from '@@shared/decorators/payload-extractor.decorator';
import { PrismaRpcExceptionInterceptor } from '@@shared/interceptors/prisma-rpc-exception.interceptor';


@Controller()
@UseInterceptors(PrismaRpcExceptionInterceptor)
export class MovieReviewController {
  constructor(private readonly movieService: MovieReviewService) {}

  @MessagePattern({cmd: 'get-top'})
  public async getTop(@PayloadQuery('count', new ParseIntPipe({ optional: true })) count?: number) {
    return this.movieService.getTopMoviesIdsByRating(count);
  }
}
