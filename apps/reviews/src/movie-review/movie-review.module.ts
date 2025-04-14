import { Module } from '@nestjs/common';
import { MovieReviewService } from './movie-review.service';
import { MovieReviewController } from './movie-review.controller';
import { TransactionContextService } from '@@shared/services/transaction-context/transaction-context.service';
import { PrismaClientProviderService } from '@@shared/services/prisma-client-provider/prisma-client-provider.service';


@Module({
  providers: [MovieReviewService, TransactionContextService, PrismaClientProviderService],
  controllers: [MovieReviewController]
})
export class MovieReviewModule {}
