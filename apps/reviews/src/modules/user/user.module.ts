import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TransactionContextService } from '@@shared/services/transaction-context/transaction-context.service';
import { PrismaClientProviderService } from '@@shared/services/prisma-client-provider/prisma-client-provider.service';


@Module({
  controllers: [UserController],
  providers: [UserService, TransactionContextService, PrismaClientProviderService],
})
export class UserModule {}
