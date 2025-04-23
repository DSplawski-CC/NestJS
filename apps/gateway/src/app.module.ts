import { Module } from '@nestjs/common';
import { ReviewsModule } from './reviews/reviews.module';
import { UsersModule } from './users/users.module';
import { MovieReviewModule } from './movie-review/movie-review.module';
import { SharedModule } from '@@shared/shared.module';
import { AuthModule } from '@@gateway/auth/auth.module';


@Module({
  imports: [
    SharedModule.forRoot({ global: true }),
    AuthModule,
    ReviewsModule,
    UsersModule,
    MovieReviewModule,
  ],
})
export class AppModule {}