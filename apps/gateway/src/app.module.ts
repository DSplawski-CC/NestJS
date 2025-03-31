import { Module } from '@nestjs/common';
import { ReviewsModule } from './reviews/reviews.module';
import { UsersModule } from './users/users.module';
import { MovieReviewModule } from './movie-review/movie-review.module';


@Module({
  imports: [
    ReviewsModule,
    UsersModule,
    MovieReviewModule,
  ],
})
export class AppModule {}