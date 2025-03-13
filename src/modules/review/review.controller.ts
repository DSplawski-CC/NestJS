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
    reviewsDto.forEach((reviewDto, index) =>  reviewDto.author = this.userService.getUser(reviewEntities[index].userId).name)

    return reviewsDto;
  }

  @Get(':reviewId')
  public getReview(
    @Param('movieId', ParseIntPipe) movieId: number,
    @Param('reviewId', ParseIntPipe) reviewId: number,
  ): ReviewResponseDto {
    const reviewEntity: ReviewEntity = this.reviewService.getReview(movieId, reviewId);
    const reviewDto = plainToInstance(ReviewResponseDto, reviewEntity);
    reviewDto.author = this.userService.getUser(reviewEntity.userId).name;

    return reviewDto;
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
