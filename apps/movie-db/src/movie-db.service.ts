import { Inject, Injectable } from '@nestjs/common';
import { MovieDb } from 'moviedb-promise';
import { MOVIE_DB } from './constants';


@Injectable()
export class MovieDbService {
  @Inject(MOVIE_DB) movieDb: MovieDb;


}
