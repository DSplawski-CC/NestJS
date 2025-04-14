import { Injectable, UseInterceptors } from '@nestjs/common';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { PrismaClientProviderService } from '@@shared/services/prisma-client-provider/prisma-client-provider.service';
import { CreateReviewDto, ReviewResponseDto } from '@@shared/dto/review.dto';
import { UserService } from '@@users/user.service';
import { TransactionInterceptor } from '@@shared/interceptors/transaction.interceptor';
import { CreateUserDto } from '@@shared/dto/user.dto';


@Injectable()
export class ReviewService {
  constructor(
    private readonly prismaProvider: PrismaClientProviderService,
    private readonly userService: UserService,
  ) {}

  private get prisma() {
    return this.prismaProvider.getClient();
  }

  public async getReviews(movieId: number) {
    const reviews = await this.prisma.review.findMany({
      where: { movieId },
      include: {
        author: true,
      }
    });

    return plainToInstance(ReviewResponseDto, reviews, { excludeExtraneousValues: true });
  }

  public async getReview(movieId: number, reviewId: number) {
    const review = await this.prisma.review.findUniqueOrThrow({
      where: { movieId: movieId, id: reviewId },
      include: {
        author: true,
      }
    });

    return plainToInstance(ReviewResponseDto, review, { excludeExtraneousValues: true });
  }

  @UseInterceptors(TransactionInterceptor)
  public async createReview(movieId: number, reviewDto: CreateReviewDto) {
    await this.userService.ensureUserExists(plainToInstance(CreateUserDto, reviewDto.author));

    const reviewEntity = instanceToPlain(reviewDto, { excludeExtraneousValues: true }) as Prisma.ReviewCreateInput;
    reviewEntity.movieId = movieId;
    reviewEntity.author = { connect: { email: reviewDto.author.email }};

    const review = await this.prisma.review.create({
      data: reviewEntity,
      include: {
        author: true,
      }
    });

    return plainToInstance(ReviewResponseDto, review, { excludeExtraneousValues: true });
  }
}
