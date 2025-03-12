import { Injectable, NotFoundException } from '@nestjs/common';
import { ReviewEntity } from '@modules/review/review.entity';

@Injectable()
export class ReviewService {
  moviesReviewsMap = new Map<number, ReviewEntity[]>([
    [
      927342, [
      {
        id: 1,
        movieId: 927342,
        title: 'Made my day',
        userId: '4905c177-b02b-4392-8788-4ec0486432fa',
        content: 'Really good action movie',
        rating: 7.5,
        createdAt: '2018-06-01',
      },
      {
        id: 2,
        movieId: 927342,
        title: 'Best dialogues ever!',
        userId: '4905c177-b02b-4392-8788-4ec0486432fa',
        content: 'I had fun watching this movie. The dialogs between main characters is essential part',
        rating: 6.8,
        createdAt: '2018-04-21',
      }]
    ]
  ]);

  public generateReviewId(movieId: number): number {
    if (!this.moviesReviewsMap.has(movieId)) {
      throw new NotFoundException('Movie not found');
    }

    return this.moviesReviewsMap.get(movieId)!.length + 1;
  }

  public getReviews(movieId: number): ReviewEntity[] {
    if (!this.moviesReviewsMap.has(movieId)) {
      throw new NotFoundException('Movie not found');
    }

    return this.moviesReviewsMap.get(movieId)!;
  }

  public getReview(movieId: number, reviewId: number) {
    const review = this.getReviews(movieId).find(review => review.id === reviewId);

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return review;
  }

  public addReview(movieId: number, review: ReviewEntity) {
    this.getReviews(movieId).push(review);

    return review;
  }
}
