import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AsyncLocalStorage } from 'async_hooks';

interface TransactionStore {
  transactionContext: Prisma.TransactionClient;
}

@Injectable()
export class TransactionContextService {
  private readonly asyncLocalStorage = new AsyncLocalStorage<TransactionStore>();

  runInTransaction<T>(
    transactionContext: Prisma.TransactionClient,
    callback: () => Promise<T>,
  ): Promise<T> {
    return this.asyncLocalStorage.run({ transactionContext }, callback);
  }

  getTransactionClient(): Prisma.TransactionClient | undefined {
    return this.asyncLocalStorage.getStore()?.transactionContext;
  }
}
