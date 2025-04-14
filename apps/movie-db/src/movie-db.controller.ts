import { Controller, Inject } from '@nestjs/common';
import { MicroserviceRouteService } from '@@shared/services/microservice-route/microservice-route.service';

@Controller()
export class MovieDbController {
  constructor(@Inject('MOVIE-DB_MICROSERVICE') private readonly microserviceRoute: MicroserviceRouteService) {}

}
