import { MovieDb } from 'moviedb-promise';
import { InjectionToken } from '@nestjs/common';


export const MOVIE_DB: InjectionToken<MovieDb> = Symbol('movieDb');