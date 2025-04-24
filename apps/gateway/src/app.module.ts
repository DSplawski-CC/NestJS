import { Module } from '@nestjs/common';
import { ReviewsModule } from './reviews/reviews.module';
import { UsersModule } from './users/users.module';
import { MovieReviewModule } from './movie-review/movie-review.module';
import { SharedModule } from '@@shared/shared.module';
import { AuthModule } from '@@gateway/auth/auth.module';
import { MovieDbModule } from './movie-db/movie-db.module';


@Module({
  imports: [
    SharedModule.forRoot({ global: true }),
    AuthModule,
    ReviewsModule,
    UsersModule,
    MovieReviewModule,
    MovieDbModule,
  ],
})
export class AppModule {}