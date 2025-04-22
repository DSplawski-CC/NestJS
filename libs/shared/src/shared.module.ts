import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { MicroserviceRouteService } from './services/microservice-route/microservice-route.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [SharedService, MicroserviceRouteService],
  exports: [SharedService],
})
export class SharedModule {}
