import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClientProviderService } from './prisma-client-provider.service';

describe('PrismaClientProviderService', () => {
  let service: PrismaClientProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaClientProviderService],
    }).compile();

    service = module.get<PrismaClientProviderService>(PrismaClientProviderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
