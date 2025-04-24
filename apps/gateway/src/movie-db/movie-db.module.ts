import { Module } from '@nestjs/common';
import { MovieDbController } from './movie-db.controller';
import { MicroserviceRouteService } from '@@shared/services/microservice-route/microservice-route.service';
import { ClientProxyFactory } from '@nestjs/microservices';
import { getClientOptions } from '@@movies/main';


@Module({
  controllers: [MovieDbController],
  providers: [
    { provide: 'MOVIE-DB_MICROSERVICE', useFactory: () => new MicroserviceRouteService(ClientProxyFactory.create(getClientOptions())) },
  ],
})
export class MovieDbModule {}
