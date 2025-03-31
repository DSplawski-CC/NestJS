import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { firstValueFrom } from 'rxjs';
import { TransactionContextService } from '@@shared/services/transaction-context/transaction-context.service';


@Injectable()
export class TransactionInterceptor implements NestInterceptor {
  constructor(
    private readonly prisma: PrismaService,
    private readonly txContext: TransactionContextService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    return this.prisma.$transaction(async (tx) => {
      return this.txContext.runInTransaction(tx, () => firstValueFrom(next.handle()));
    });
  }
}
