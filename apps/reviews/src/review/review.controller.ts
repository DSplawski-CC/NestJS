import { Controller, ParseIntPipe } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto, ReviewResponseDto } from '@@shared/dto/review.dto';
import { MessagePattern } from '@nestjs/microservices';
import { PayloadBody, PayloadParam } from '@@shared/decorators/payload-extractor.decorator';


@Controller()
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @MessagePattern({ cmd: 'get_reviews' })
  public async getReviews(@PayloadParam('movieId', ParseIntPipe) movieId: number): Promise<ReviewResponseDto[]> {
    return this.reviewService.getReviews(movieId);
  }

  @MessagePattern({ cmd: 'get_review' })
  public async getReview(
    @PayloadParam('movieId', ParseIntPipe) movieId: number,
    @PayloadParam('reviewId', ParseIntPipe) reviewId: number,
  ): Promise<ReviewResponseDto> {
    return await this.reviewService.getReview(movieId, reviewId);
  }

  @MessagePattern({ cmd: 'create_review' })
  public async createReview(
    @PayloadParam('movieId', ParseIntPipe) movieId: number,
    @PayloadBody() createReviewDto: CreateReviewDto,
  ): Promise<ReviewResponseDto> {
    return this.reviewService.createReview(movieId, createReviewDto);
  }
}
