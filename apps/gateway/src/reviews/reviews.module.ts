import { Module } from '@nestjs/common';
import { ReviewsController } from '@@gateway/reviews/reviews.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MicroserviceRouteService } from '@@shared/services/microservice-route/microservice-route.service';


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
  controllers: [ReviewsController],
})
export class ReviewsModule {}
