import { Module } from '@nestjs/common';
import { ReviewController } from '@modules/review/review.controller';
import { ReviewService } from '@modules/review/review.service';
import { UserService } from '@modules/user/user.service';
import { TransactionContextService } from '@core/services/transaction-context/transaction-context.service';
import { PrismaClientProviderService } from '@core/services/prisma-client-provider/prisma-client-provider.service';


@Module({
  controllers: [ReviewController],
  providers: [ReviewService, UserService, TransactionContextService, PrismaClientProviderService],
})
export class ReviewModule {}
