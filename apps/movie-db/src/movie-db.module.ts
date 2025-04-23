import { Module } from '@nestjs/common';
import { MovieDbController } from './movie-db.controller';
import { ClientProxyFactory } from '@nestjs/microservices';
import { getClientOptions } from './main';
import { MicroserviceRouteService } from '@@shared/services/microservice-route/microservice-route.service';
import { MovieDbService } from './movie-db.service';
import { ConfigService } from '@nestjs/config';
import { MovieDb } from 'moviedb-promise';
import { MOVIE_DB } from './constants';


@Module({
  providers: [
    ConfigService,
    { provide: 'MOVIE-DB_MICROSERVICE', useFactory: () => new MicroserviceRouteService(ClientProxyFactory.create(getClientOptions())) },
    { provide: MOVIE_DB, useFactory: (configService: ConfigService) => new MovieDb(configService.get('MOVIE_DB_API_KEY')!) },
    MovieDbService,
  ],
  controllers: [MovieDbController],
})
export class MovieDbModule {}
