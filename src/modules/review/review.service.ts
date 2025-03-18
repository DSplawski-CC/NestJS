import { Injectable } from '@nestjs/common';
import { ReviewEntity } from '@modules/review/review.entity';
import { CreateReviewDto, ReviewResponseDto } from '@modules/review/review.dto';
import { plainToInstance } from 'class-transformer';
import { UserService } from '@modules/user/user.service';
import { PrismaService } from 'nestjs-prisma';


@Injectable()
export class ReviewService {
  constructor(
    private prisma: PrismaService,
    private readonly userService: UserService
  ) {}

  public async getReviews(movieId: number) {
    const reviews = await this.prisma.review.findMany({
      where: { movieId },
      include: {
        user: true,
      }
    });

    return plainToInstance(ReviewResponseDto, reviews, { excludeExtraneousValues: true });
  }

  public async getReview(movieId: number, reviewId: number) {
    const review = await this.prisma.review.findUniqueOrThrow({
      where: { movieId: movieId, id: reviewId },
      include: {
        user: true,
      }
    });

    return plainToInstance(ReviewResponseDto, review, { excludeExtraneousValues: true });
  }

  public async addReview(movieId: number, reviewDto: CreateReviewDto) {
    await this.userService.addUser({
      name: reviewDto.author,
      email: reviewDto.email,
    });

    const reviewEntity = plainToInstance(ReviewEntity, reviewDto, { excludeExtraneousValues: true });

    const review = await this.prisma.review.create({
      data: reviewEntity,
      include: {
        user: true,
      }
    });

    return plainToInstance(ReviewResponseDto, review, { excludeExtraneousValues: true });
  }
}
