import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ReviewService } from '@modules/review/review.service';
import { ReviewResponseDto } from '@modules/review/review.dto';
import { plainToInstance } from 'class-transformer';
import { ReviewEntity } from '@modules/review/review.entity';


@Controller('movies/:movieId/reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  public getReviews(@Param('movieId', ParseIntPipe) movieId: number): ReviewResponseDto[] {
    let reviewEntities: ReviewEntity[] = this.reviewService.getReviews(movieId);

    return plainToInstance(ReviewResponseDto, reviewEntities);
  }

  @Get(':reviewId')
  public getReview(
    @Param('movieId', ParseIntPipe) movieId: number,
    @Param('reviewId', ParseIntPipe) reviewId: number,
  ): ReviewResponseDto {
    const reviewEntity: ReviewEntity = this.reviewService.getReview(movieId, reviewId);

    return plainToInstance(ReviewResponseDto, reviewEntity);
  }
}
