import { Test, TestingModule } from '@nestjs/testing';
import { MovieDbService } from './movie-db.service';

describe('MovieDbService', () => {
  let service: MovieDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieDbService],
    }).compile();

    service = module.get<MovieDbService>(MovieDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
