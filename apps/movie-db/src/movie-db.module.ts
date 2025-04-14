import { Module } from '@nestjs/common';
import { MovieDbController } from './movie-db.controller';
import { ClientProxyFactory } from '@nestjs/microservices';
import { getClientOptions } from './main';
import { MicroserviceRouteService } from '@@shared/services/microservice-route/microservice-route.service';


@Module({
  providers: [
    { provide: 'MOVIE-DB_MICROSERVICE', useFactory: () => new MicroserviceRouteService(ClientProxyFactory.create(getClientOptions())) },
  ],
  controllers: [MovieDbController],
})
export class MovieDbModule {}
