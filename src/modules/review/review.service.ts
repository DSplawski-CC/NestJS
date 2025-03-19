import { Injectable } from '@nestjs/common';
import { CreateReviewDto, ReviewResponseDto } from '@modules/review/review.dto';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { UserService } from '@modules/user/user.service';
import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from '@modules/user/user.dto';


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

    console.log('reviews', reviews)
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

  public async createReview(movieId: number, reviewDto: CreateReviewDto) {
    await this.userService.ensureUserExists(plainToInstance(CreateUserDto, reviewDto.author));

    const reviewEntity = instanceToPlain(reviewDto, { excludeExtraneousValues: true }) as  Prisma.ReviewCreateInput;
    reviewEntity.movieId = movieId;
    reviewEntity.user = { connect: { email: reviewDto.author.email }};

    const review = await this.prisma.review.create({
      data: reviewEntity,
      include: {
        user: true,
      }
    });

    return plainToInstance(ReviewResponseDto, review, { excludeExtraneousValues: true });
  }
}
