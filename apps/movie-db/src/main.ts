import { NestFactory } from '@nestjs/core';
import { MovieDbModule } from './movie-db.module';
import { AppModule } from '@@review/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ClientOptions } from '@nestjs/microservices/interfaces/client-metadata.interface';


export function getClientOptions() {
  return {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3032,
    },
  } satisfies ClientOptions;
}

async function bootstrap() {
  const app = await NestFactory.create(MovieDbModule);
  app.enableCors();

  app.connectMicroservice<MicroserviceOptions>(getClientOptions());

  await app.startAllMicroservices();
  await app.listen(3031);
}

bootstrap();
