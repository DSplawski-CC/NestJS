import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { MicroserviceRouteService } from '@@shared/services/microservice-route/microservice-route.service';
import { MovieReviewController } from './movie-review.controller';
import { getClientOptions as getMovieReviewClientOptions} from '@@review/main';
import { getClientOptions as getMovieDbClientOptions} from '@@movies/main';


@Module({
  providers: [
    { provide: 'MOVIE-REVIEW_MICROSERVICE', useFactory: () => new MicroserviceRouteService(ClientProxyFactory.create(getMovieReviewClientOptions())) },
    { provide: 'MOVIE-DB_MICROSERVICE', useFactory: () => new MicroserviceRouteService(ClientProxyFactory.create(getMovieDbClientOptions())) },
  ],
  controllers: [MovieReviewController],
})
export class MovieReviewModule {}
