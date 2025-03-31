import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
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
  controllers: [UsersController]
})
export class UsersModule {}
