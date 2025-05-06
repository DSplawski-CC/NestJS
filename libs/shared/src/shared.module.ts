import { DynamicModule, Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { TransactionContextService } from '@@shared/services/transaction-context/transaction-context.service';
import { PrismaClientProviderService } from '@@shared/services/prisma-client-provider/prisma-client-provider.service';
import { PrismaModule } from 'nestjs-prisma';
import { JwtAuthGuard } from '@@gateway/auth/jwt-auth.guard';

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
          envFilePath: `${process.cwd()}\\${(process.env.NODE_ENV as string).trim()}.env`,
        }),
        JwtModule.register({
          global: true,
        }),
      ],
      providers: [
        TransactionContextService, PrismaClientProviderService,
        SharedService,
        {
          provide: APP_GUARD,
          useClass: JwtAuthGuard,
        },
      ],
      exports: [
        SharedService,
        TransactionContextService,
        PrismaClientProviderService,
        JwtModule,
        ConfigModule,
      ],
    }
  }
}

interface SharedModuleOptions {
  global?: boolean;
}
