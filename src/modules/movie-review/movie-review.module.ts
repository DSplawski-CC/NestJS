import { Module } from '@nestjs/common';
import { MovieReviewService } from './movie-review.service';
import { MovieReviewController } from './movie-review.controller';
import { PrismaClientProviderService } from '@core/services/prisma-client-provider/prisma-client-provider.service';
import { TransactionContextService } from '@core/services/transaction-context/transaction-context.service';


@Module({
  providers: [MovieReviewService, TransactionContextService, PrismaClientProviderService],
  controllers: [MovieReviewController]
})
export class MovieReviewModule {}
