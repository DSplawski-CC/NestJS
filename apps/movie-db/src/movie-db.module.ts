import { Module } from '@nestjs/common';
import { MovieDbController } from './movie-db.controller';
import { MovieDbService } from './movie-db.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MovieDb } from 'moviedb-promise';
import { MOVIE_DB } from './constants';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [
    { inject: [ConfigService], provide: MOVIE_DB, useFactory: function (configService: ConfigService) { return new MovieDb(configService.get('MOVIE_DB_API_KEY')!) } },
    MovieDbService,
  ],
  controllers: [MovieDbController],
})
export class MovieDbModule {}
