import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReviewController } from '@modules/review/review.controller';
import { ReviewService } from '@modules/review/review.service';


@Module({
  imports: [],
  controllers: [AppController, ReviewController],
  providers: [AppService, ReviewService],
})
export class AppModule {}
