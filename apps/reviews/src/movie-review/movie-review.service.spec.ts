import { Test, TestingModule } from '@nestjs/testing';
import { MovieReviewService } from './movie-review.service';

describe('MovieReviewService', () => {
  let service: MovieReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieReviewService],
    }).compile();

    service = module.get<MovieReviewService>(MovieReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
