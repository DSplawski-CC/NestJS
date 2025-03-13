import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ReviewEntity } from '@modules/review/review.entity';
import { CreateReviewDto, ReviewResponseDto } from '@modules/review/review.dto';
import { plainToInstance } from 'class-transformer';
import { UserService } from '@modules/user/user.service';

@Injectable()
export class ReviewService {
  moviesReviewsMap = new Map<number, ReviewEntity[]>([
    [
      927342, [
      {
        id: 1,
        movieId: 927342,
        title: 'Made my day',
        email: 'mike@mike.com',
        content: 'Really good action movie',
        rating: 7.5,
        createdAt: '2018-06-01',
      },
      {
        id: 2,
        movieId: 927342,
        title: 'Best dialogues ever!',
        email: 'jason@jason.com',
        content: 'I had fun watching this movie. The dialogs between main characters is essential part',
        rating: 6.8,
        createdAt: '2018-04-21',
      }]
    ]
  ]);

  constructor(private readonly userService: UserService) {}

  public generateReviewId(movieId: number): number {
    return this.getReviews(movieId)!.length + 1;
  }

  public getReviews(movieId: number): ReviewEntity[] {
    if (!this.moviesReviewsMap.has(movieId)) {
      this.moviesReviewsMap.set(movieId, []);
    }
    return this.moviesReviewsMap.get(movieId)!;
  }

  public getReview(movieId: number, reviewId: number) {
    const reviewEntity = this.getReviews(movieId).find(review => review.id === reviewId);

    if (!reviewEntity) {
      throw new NotFoundException('Review not found');
    }

    const reviewDto = plainToInstance(ReviewResponseDto, reviewEntity);
    const userResponseDto = this.userService.getUser(reviewEntity.email);
    reviewDto.author = userResponseDto.name;
    reviewDto.email = userResponseDto.email;

    return reviewDto;
  }

  public addReview(movieId: number, reviewDto: CreateReviewDto) {
    const reviews = this.getReviews(movieId);

    if (reviews.find(el => el.email === reviewDto.email)) {
      throw new ConflictException(`User with email "${reviewDto.email}" already posted review`);
    }

    const review = plainToInstance(ReviewEntity, reviewDto);
    review.id = this.generateReviewId(movieId);
    review.createdAt = new Date().toISOString();

    try {
      this.userService.addUser({
        name: reviewDto.author,
        email: reviewDto.email,
      });
    } catch (e) {
    }

    reviews.push(review);
    return plainToInstance(ReviewResponseDto, review);
  }
}
