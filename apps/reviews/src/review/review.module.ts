import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { UserService } from '@@users/user.service';
import { TransactionContextService } from '@@shared/services/transaction-context/transaction-context.service';
import { PrismaClientProviderService } from '@@shared/services/prisma-client-provider/prisma-client-provider.service';
import { MicroserviceRouteService } from '@@shared/services/microservice-route/microservice-route.service';
import { ClientProxyFactory } from '@nestjs/microservices';
import { getClientOptions } from '@@users/main';


@Module({
  controllers: [ReviewController],
  providers: [ReviewService, UserService, TransactionContextService, PrismaClientProviderService,
    { provide: 'USER_MICROSERVICE', useFactory: () => new MicroserviceRouteService(ClientProxyFactory.create(getClientOptions())) }
  ],
})
export class ReviewModule {}
