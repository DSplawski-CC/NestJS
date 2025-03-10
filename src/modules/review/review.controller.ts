import { Controller, Get, Param } from '@nestjs/common';
import { ReviewService } from '@modules/review/review.service';


@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('reviews/:movieId')
  public getReviews(@Param('movieId') movieId: number) {
    return this.reviewService.getReviews(movieId);
  }
}
