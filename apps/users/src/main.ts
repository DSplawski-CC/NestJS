import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ClientOptions } from '@nestjs/microservices/interfaces/client-metadata.interface';
import { PrismaRpcExceptionInterceptor } from '@@shared/interceptors/prisma-rpc-exception.interceptor';


export function getClientOptions() {
  return {
    transport: Transport.TCP,
    options: {
      host: process.env.DOMAIN,
      port: 3022,
    },
  } satisfies ClientOptions;
}


async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  app.enableCors();
  app.connectMicroservice<MicroserviceOptions>(getClientOptions());

  await app.startAllMicroservices();
  await app.listen(3021);
}

bootstrap();
