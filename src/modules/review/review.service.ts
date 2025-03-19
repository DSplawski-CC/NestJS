import { Injectable, UseInterceptors } from '@nestjs/common';
import { CreateReviewDto, ReviewResponseDto } from '@modules/review/review.dto';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { UserService } from '@modules/user/user.service';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from '@modules/user/user.dto';
import { TransactionInterceptor } from '@core/interceptors/transaction.interceptor';
import { PrismaClientProviderService } from '@core/services/prisma-client-provider/prisma-client-provider.service';


@Injectable()
export class ReviewService {
  constructor(
    private readonly prismaProvider: PrismaClientProviderService,
    private readonly userService: UserService
  ) {}

  private get prisma() {
    return this.prismaProvider.getClient();
  }

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

  @UseInterceptors(TransactionInterceptor)
  public async createReview(movieId: number, reviewDto: CreateReviewDto) {
    await this.userService.ensureUserExists(plainToInstance(CreateUserDto, reviewDto.author));

    const reviewEntity = instanceToPlain(reviewDto, { excludeExtraneousValues: true }) as Prisma.ReviewCreateInput;
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
