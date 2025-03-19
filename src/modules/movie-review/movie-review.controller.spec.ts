import { Test, TestingModule } from '@nestjs/testing';
import { MovieReviewController } from './movie-review.controller';

describe('MovieReviewController', () => {
  let controller: MovieReviewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieReviewController],
    }).compile();

    controller = module.get<MovieReviewController>(MovieReviewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
