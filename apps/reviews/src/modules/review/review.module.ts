import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { UserService } from '../user/user.service';
import { TransactionContextService } from '@@shared/services/transaction-context/transaction-context.service';
import { PrismaClientProviderService } from '@@shared/services/prisma-client-provider/prisma-client-provider.service';


@Module({
  controllers: [ReviewController],
  providers: [ReviewService, UserService, TransactionContextService, PrismaClientProviderService],
})
export class ReviewModule {}
