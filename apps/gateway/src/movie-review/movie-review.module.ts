import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { MicroserviceRouteService } from '@@shared/services/microservice-route/microservice-route.service';
import { MovieReviewController } from './movie-review.controller';
import { getClientOptions } from '@@review/main';


@Module({
  providers: [
    { provide: 'MOVIE-REVIEW_MICROSERVICE', useFactory: () => new MicroserviceRouteService(ClientProxyFactory.create(getClientOptions())) }
  ],
  controllers: [MovieReviewController],
})
export class MovieReviewModule {}
