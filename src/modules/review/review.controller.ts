import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ReviewService } from '@modules/review/review.service';
import { CreateReviewDto, ReviewResponseDto } from '@modules/review/review.dto';


@Controller('movies/:movieId/reviews')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
  ) {}

  @Get()
  public async getReviews(@Param('movieId', ParseIntPipe) movieId: number): Promise<ReviewResponseDto[]> {
    return this.reviewService.getReviews(movieId);
  }

  @Get(':reviewId')
  public async getReview(
    @Param('movieId', ParseIntPipe) movieId: number,
    @Param('reviewId', ParseIntPipe) reviewId: number,
  ): Promise<ReviewResponseDto> {
    return await this.reviewService.getReview(movieId, reviewId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createReview(
    @Param('movieId', ParseIntPipe) movieId: number,
    @Body() createReviewDto: CreateReviewDto,
  ): Promise<ReviewResponseDto> {
    return this.reviewService.createReview(movieId, createReviewDto);
  }
}
