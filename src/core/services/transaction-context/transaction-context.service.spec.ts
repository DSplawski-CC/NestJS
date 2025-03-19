import { Test, TestingModule } from '@nestjs/testing';
import { TransactionContextService } from './transaction-context.service';

describe('TransactionContextService', () => {
  let service: TransactionContextService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionContextService],
    }).compile();

    service = module.get<TransactionContextService>(TransactionContextService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
