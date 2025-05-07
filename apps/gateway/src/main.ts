import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import {
  RpcToHttpExceptionInterceptor,
} from '@@shared/interceptors/prisma-rpc-exception.interceptor';
const cookieParser = require('cookie-parser');


declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Movies DB')
    .setDescription('The MOVIES DB API description')
    .setVersion('1.0')
    .addTag('movies')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory, {
    jsonDocumentUrl: 'swagger/json',
  });

  app.enableCors({
    origin: 'http://localhost:4200',
    preflightContinue: false,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  app.use(cookieParser());
  app.useGlobalInterceptors(new RpcToHttpExceptionInterceptor());
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3001,
      },
    },
  );


  await app.startAllMicroservices();
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
