import { Module } from '@nestjs/common';
import { MovieImagesController } from './movie-images.controller';

@Module({
  controllers: [MovieImagesController]
})
export class MovieImagesModule {}
