import { Test, TestingModule } from '@nestjs/testing';
import { MovieImagesController } from './movie-images.controller';

describe('MovieImagesController', () => {
  let controller: MovieImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieImagesController],
    }).compile();

    controller = module.get<MovieImagesController>(MovieImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
