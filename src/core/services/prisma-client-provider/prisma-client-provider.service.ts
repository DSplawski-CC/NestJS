import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';
import { TransactionContextService } from '@core/services/transaction-context/transaction-context.service';


@Injectable()
export class PrismaClientProviderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly txContext: TransactionContextService,
  ) {}

  getClient(): Prisma.TransactionClient | PrismaService {
    return this.txContext.getTransactionClient() || this.prisma;
  }
}
