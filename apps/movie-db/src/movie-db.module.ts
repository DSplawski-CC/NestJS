import { Module } from '@nestjs/common';
import { MovieDbController } from './movie-db.controller';
import { MovieDbService } from './movie-db.service';

@Module({
  imports: [],
  controllers: [MovieDbController],
  providers: [MovieDbService],
})
export class MovieDbModule {}
