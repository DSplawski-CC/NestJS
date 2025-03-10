import { Controller, Get, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { ReviewService } from '@modules/review/review.service';
import { ReviewResponseDto } from '@modules/review/review.dto';
import { plainToInstance } from 'class-transformer';


@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('reviews/:movieId')
  public getReviews(@Param('movieId', ParseIntPipe) movieId: number): ReviewResponseDto[] {
    let reviewEntities: ReviewResponseDto[] = [];
    try {
      reviewEntities = this.reviewService.getReviews(movieId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
    }

    return plainToInstance(ReviewResponseDto, reviewEntities);
  }
}
