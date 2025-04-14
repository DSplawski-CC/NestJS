import { Module } from '@nestjs/common';
import { ReviewsController } from '@@gateway/reviews/reviews.controller';
import { MicroserviceRouteService } from '@@shared/services/microservice-route/microservice-route.service';
import { getClientOptions } from '@@review/main';
import { ClientProxyFactory } from '@nestjs/microservices';


@Module({
  providers: [
    { provide: 'REVIEW_MICROSERVICE', useFactory: () => new MicroserviceRouteService(ClientProxyFactory.create(getClientOptions())) }
  ],
  controllers: [ReviewsController],
})
export class ReviewsModule {}
