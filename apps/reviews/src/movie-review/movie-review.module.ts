import { Module } from '@nestjs/common';
import { MovieReviewService } from './movie-review.service';
import { MovieReviewController } from './movie-review.controller';


@Module({
  providers: [MovieReviewService],
  controllers: [MovieReviewController]
})
export class MovieReviewModule {}
