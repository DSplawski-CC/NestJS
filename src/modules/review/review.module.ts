import { Module } from '@nestjs/common';
import { ReviewController } from '@modules/review/review.controller';
import { ReviewService } from '@modules/review/review.service';
import { UserService } from '@modules/user/user.service';


@Module({
  controllers: [ReviewController],
  providers: [ReviewService, UserService],
})
export class ReviewModule {}
