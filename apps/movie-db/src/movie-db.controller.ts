import { Controller, Get } from '@nestjs/common';
import { MovieDbService } from './movie-db.service';

@Controller()
export class MovieDbController {
  constructor(private readonly movieDbService: MovieDbService) {}

  @Get()
  getHello(): string {
    return this.movieDbService.getHello();
  }
}
