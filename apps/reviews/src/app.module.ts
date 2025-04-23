import { Module } from '@nestjs/common';
import { ReviewModule } from '@@review/review/review.module';
import { MovieReviewModule } from '@@review/movie-review/movie-review.module';
import { UserModule } from '@@users/user.module';
import { SharedModule } from '@@shared/shared.module';


@Module({
  imports: [
    SharedModule.forRoot({ global: true }),
    ReviewModule,
    MovieReviewModule,
    UserModule,
  ],
})
export class AppModule {}