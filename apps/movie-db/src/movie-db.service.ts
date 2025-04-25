import { Inject, Injectable } from '@nestjs/common';
import { MovieDb } from 'moviedb-promise';
import { MOVIE_DB } from './constants';


@Injectable()
export class MovieDbService {
  @Inject(MOVIE_DB) movieDb: MovieDb;

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
}
