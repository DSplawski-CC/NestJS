import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { ReviewModule } from '@@review/review/review.module';
import { MovieReviewModule } from '@@review/movie-review/movie-review.module';
import { UserModule } from '@@users/user.module';


@Module({
  imports: [
    ReviewModule,
    MovieReviewModule,
    UserModule,
    PrismaModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}