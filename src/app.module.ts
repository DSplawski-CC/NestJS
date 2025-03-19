import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReviewModule } from '@modules/review/review.module';
import { UserModule } from '@modules/user/user.module';
import { PrismaModule } from 'nestjs-prisma';
import { MovieReviewModule } from './modules/movie-review/movie-review.module';


@Module({
  imports: [PrismaModule.forRoot({ isGlobal: true }), ReviewModule, UserModule, MovieReviewModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
