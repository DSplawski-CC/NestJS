import { Module } from '@nestjs/common';
import { AuthController } from '@@gateway/auth/auth.controller';
import { AuthService } from '@@gateway/auth/auth.service';
import { UserService } from '@@users/user.service';
import { MicroserviceRouteService } from '@@shared/services/microservice-route/microservice-route.service';
import { ClientProxyFactory } from '@nestjs/microservices';
import { getClientOptions } from '@@users/main';
import { LocalStrategy } from '@@gateway/auth/local.strategy';
import { UsersModule } from '@@gateway/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@@gateway/auth/jwt.strategy';


@Module({
  imports: [UsersModule, PassportModule],
  controllers: [AuthController],
  providers: [
    UserService,
    AuthService,
    {
      provide: 'USER_MICROSERVICE',
      useFactory: () => new MicroserviceRouteService(ClientProxyFactory.create(getClientOptions())),
    },
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
