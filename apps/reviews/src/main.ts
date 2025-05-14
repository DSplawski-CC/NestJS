import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ClientOptions } from '@nestjs/microservices/interfaces/client-metadata.interface';
import { PrismaRpcExceptionInterceptor } from '@@shared/interceptors/prisma-rpc-exception.interceptor';


export function getClientOptions() {
  return {
    transport: Transport.TCP,
    options: {
      host: `api.${process.env.DOMAIN}`,
      port: 3012,
    },
  } satisfies ClientOptions;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.connectMicroservice<MicroserviceOptions>(getClientOptions());
  app.useGlobalInterceptors(new PrismaRpcExceptionInterceptor());

  await app.startAllMicroservices();
  await app.listen(3011);
}

bootstrap();
