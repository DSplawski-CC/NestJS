import { Module } from '@nestjs/common';
import { AuthController } from '@@gateway/auth/auth.controller';
import { AuthService } from '@@gateway/auth/auth.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthorizationGuard } from '@@shared/guards/authorization.guard';
import { UserService } from '@@users/user.service';
import { MicroserviceRouteService } from '@@shared/services/microservice-route/microservice-route.service';
import { ClientProxyFactory } from '@nestjs/microservices';
import { getClientOptions } from '@@users/main';


@Module({
  controllers: [AuthController],
  providers: [
    UserService,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard,
    },
    {
      provide: 'USER_MICROSERVICE',
      useFactory: () => new MicroserviceRouteService(ClientProxyFactory.create(getClientOptions())),
    },
  ],
})
export class AuthModule {}
