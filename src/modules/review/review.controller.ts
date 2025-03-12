import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ReviewService } from '@modules/review/review.service';
import { CreateReviewDto, ReviewResponseDto } from '@modules/review/review.dto';
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

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public createReview(
    @Param('movieId', ParseIntPipe) movieId: number,
    @Body() createReviewDto: CreateReviewDto,
  ): ReviewResponseDto {


    const review = plainToInstance(ReviewEntity, createReviewDto);
    review.id = this.reviewService.generateReviewId(movieId);
    review.createdAt = new Date().toISOString();
    this.reviewService.addReview(movieId, review);

    return plainToInstance(ReviewResponseDto, review);
  }
}
