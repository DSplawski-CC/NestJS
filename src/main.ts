import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AuthorizationGuard } from './core/guards/authorization.guard';


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

  app.enableCors();
  app.useGlobalGuards(new AuthorizationGuard());
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
