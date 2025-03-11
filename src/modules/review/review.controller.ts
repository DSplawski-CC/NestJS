import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ReviewService } from '@modules/review/review.service';
import { ReviewResponseDto } from '@modules/review/review.dto';
import { plainToInstance } from 'class-transformer';


@Controller('movies/:movieId/reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  public getReviews(@Param('movieId', ParseIntPipe) movieId: number): ReviewResponseDto[] {
    let reviewEntities: ReviewResponseDto[] = this.reviewService.getReviews(movieId);

    return plainToInstance(ReviewResponseDto, reviewEntities);
  }
}
