import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ReviewService } from '@modules/review/review.service';
import { CreateReviewDto, ReviewResponseDto } from '@modules/review/review.dto';
import { ReviewEntity } from '@modules/review/review.entity';
import { UserService } from '@modules/user/user.service';


@Controller('movies/:movieId/reviews')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly userService: UserService,
  ) {}

  @Get()
  public getReviews(@Param('movieId', ParseIntPipe) movieId: number): ReviewResponseDto[] {
    let reviewEntities: ReviewEntity[] = this.reviewService.getReviews(movieId);
    const reviewsDto = plainToInstance(ReviewResponseDto, reviewEntities);
    reviewsDto.forEach((reviewDto, index) =>  reviewDto.author = this.userService.getUser(reviewEntities[index].email).name)

    return reviewsDto;
  }

  @Get(':reviewId')
  public getReview(
    @Param('movieId', ParseIntPipe) movieId: number,
    @Param('reviewId', ParseIntPipe) reviewId: number,
  ): ReviewResponseDto {
    return this.reviewService.getReview(movieId, reviewId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public createReview(
    @Param('movieId', ParseIntPipe) movieId: number,
    @Body() createReviewDto: CreateReviewDto,
  ): ReviewResponseDto {
    return this.reviewService.addReview(movieId, createReviewDto);
  }
}
