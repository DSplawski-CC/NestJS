import { Inject, Injectable } from '@nestjs/common';
import { MovieDb } from 'moviedb-promise';
import { MOVIE_DB } from './constants';
import { PrismaClientProviderService } from '@@shared/services/prisma-client-provider/prisma-client-provider.service';
import { ImageKitService } from '@@shared/services/image-kit/image-kit.service';


@Injectable()
export class MovieDbService {
  @Inject(MOVIE_DB) movieDb: MovieDb;
  @Inject() imageKitService: ImageKitService;

  public async moviesPopular(page?: number) {
    return await this.movieDb.moviePopular({
      page: page,
    });
  }

  public async getMovie(movieId: number) {
    return await this.movieDb.movieInfo({
      id: movieId,
    });
  }

  public async getMovies(...movieIds: number[]) {
    return await Promise.all(movieIds.map(movieId => this.getMovie(movieId)));
  }

  public async getMovieImages(movieId: number) {
    return await this.imageKitService.getFileUrls(String(movieId));
  }
}
