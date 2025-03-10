import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReviewController } from './review/review.controller';

@Module({
  imports: [],
  controllers: [AppController, ReviewController],
  providers: [AppService],
})
export class AppModule {}
