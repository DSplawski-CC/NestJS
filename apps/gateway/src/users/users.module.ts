import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { MicroserviceRouteService } from '@@shared/services/microservice-route/microservice-route.service';
import { getClientOptions } from '@@users/main';
import { ClientProxyFactory } from '@nestjs/microservices';


@Module({
  providers: [
    { provide: 'USER_MICROSERVICE', useFactory: () => new MicroserviceRouteService(ClientProxyFactory.create(getClientOptions())) }
  ],
  controllers: [UsersController]
})
export class UsersModule {}
