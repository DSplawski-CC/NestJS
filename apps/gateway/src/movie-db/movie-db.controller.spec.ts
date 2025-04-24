import { Test, TestingModule } from '@nestjs/testing';
import { MovieDbController } from './movie-db.controller';

describe('MovieDbController', () => {
  let controller: MovieDbController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieDbController],
    }).compile();

    controller = module.get<MovieDbController>(MovieDbController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
