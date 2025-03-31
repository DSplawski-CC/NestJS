import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { ReviewModule } from './modules/review/review.module';
import { MovieReviewModule } from './modules/movie-review/movie-review.module';
import { UserModule } from './modules/user/user.module';


@Module({
  imports: [
    ReviewModule,
    MovieReviewModule,
    UserModule,
    PrismaModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}