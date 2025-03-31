import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MicroserviceRouteService } from '@@shared/services/microservice-route/microservice-route.service';
import { MovieReviewController } from './movie-review.controller';


@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MICROSERVICE_CLIENT',
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3012 },
      },
    ]),
  ],
  providers: [MicroserviceRouteService],
  controllers: [MovieReviewController],
})
export class MovieReviewModule {}
