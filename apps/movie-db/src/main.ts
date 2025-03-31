import { NestFactory } from '@nestjs/core';
import { MovieDbModule } from './movie-db.module';
import { AppModule } from '@@review/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(MovieDbModule);
  app.enableCors();

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3022,
      },
    },
  );

  await app.startAllMicroservices();
  await app.listen(3021);
}

bootstrap();
