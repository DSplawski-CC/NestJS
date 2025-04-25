import { DynamicModule, Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthorizationGuard } from '@@shared/guards/authorization.guard';
import { TransactionContextService } from '@@shared/services/transaction-context/transaction-context.service';
import { PrismaClientProviderService } from '@@shared/services/prisma-client-provider/prisma-client-provider.service';
import { PrismaModule } from 'nestjs-prisma';

@Module({})
export class SharedModule {
  static forRoot(options?: SharedModuleOptions): DynamicModule {
    return {
      module: SharedModule,
      global: options?.global,
      imports: [
        PrismaModule.forRoot({ isGlobal: true }),
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        JwtModule.registerAsync({
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
            global: true,
            secret: configService.get('JWT_SECRET'),
            signOptions: { expiresIn: '300s' },
          }),
        }),
      ],
      providers: [
        TransactionContextService, PrismaClientProviderService,
        SharedService,
        {
          provide: APP_GUARD,
          useClass: AuthorizationGuard,
        },
      ],
      exports: [SharedService, TransactionContextService, PrismaClientProviderService, JwtModule],
    }
  }
}

interface SharedModuleOptions {
  global?: boolean;
}
