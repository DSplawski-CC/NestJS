import { Module } from '@nestjs/common';
import { MovieDbController } from './movie-db.controller';
import { MovieDbService } from './movie-db.service';
import { ConfigService } from '@nestjs/config';
import { MovieDb } from 'moviedb-promise';
import { MOVIE_DB } from './constants';
import { SharedModule } from '@@shared/shared.module';


@Module({
  imports: [
    SharedModule.forRoot({ global: true }),
  ],
  providers: [
    { inject: [ConfigService], provide: MOVIE_DB, useFactory: async function (configService: ConfigService) { return new MovieDb(configService.get<string>('MOVIE_DB_API_KEY')!) } },
    MovieDbService,
  ],
  controllers: [MovieDbController],
})
export class MovieDbModule {}
