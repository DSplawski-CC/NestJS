import { Test, TestingModule } from '@nestjs/testing';
import { MovieDbController } from './movie-db.controller';
import { MovieDbService } from './movie-db.service';

describe('MovieDbController', () => {
  let movieDbController: MovieDbController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MovieDbController],
      providers: [MovieDbService],
    }).compile();

    movieDbController = app.get<MovieDbController>(MovieDbController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(movieDbController.getHello()).toBe('Hello World!');
    });
  });
});
