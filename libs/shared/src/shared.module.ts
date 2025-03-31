import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { MicroserviceRouteService } from './services/microservice-route/microservice-route.service';

@Module({
  providers: [SharedService, MicroserviceRouteService],
  exports: [SharedService],
})
export class SharedModule {}
