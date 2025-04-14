import { Test, TestingModule } from '@nestjs/testing';
import { MovieDbController } from './movie-db.controller';


describe('MovieDbController', () => {
  let movieDbController: MovieDbController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MovieDbController],
    }).compile();

    movieDbController = app.get<MovieDbController>(MovieDbController);
  });
});
