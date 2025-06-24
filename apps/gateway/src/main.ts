import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import {
  RpcToHttpExceptionInterceptor,
} from '@@shared/interceptors/prisma-rpc-exception.interceptor';
const cookieParser = require('cookie-parser');
import * as fs from 'fs';
import { join } from 'path';
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';


declare const module: any;

function getSslConfiguration() {
  const isProd = process.env.NODE_ENV === 'production';
  const sslPath = isProd
    ? join(__dirname, 'ssl')
    : join(__dirname, '../../../ssl');

  return {
    key: fs.readFileSync(join(sslPath, 'api.app.local.key')),
    cert: fs.readFileSync(join(sslPath, 'api.app.local.crt')),
  } satisfies HttpsOptions;
}

async function bootstrap() {


  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      ...getSslConfiguration(),
    }
  });

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
    origin: [
      'https://app.local:4200',
      'https://app.local:5173',
    ],
    credentials: true,
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
        host: `api.${process.env.DOMAIN}`,
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
