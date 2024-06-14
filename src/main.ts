import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AllExceptionsFilter } from './allexception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  // swagger config
  const config = new DocumentBuilder()
    .setTitle('YouApp API')
    .setDescription('YouApp API description')
    .setVersion('1.0')
    .addTag('youapp')
    // .addBearerAuth(undefined, 'defaultBearerAuth')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();

  // Auto-validation
  // We'll start by binding ValidationPipe at the application level, thus ensuring all endpoints are protected from receiving incorrect data.
  app.useGlobalPipes(new ValidationPipe());

  // global exception handler
  // app.useGlobalFilters(new AllExceptionsFilter());

  // Supaya bisa inject service di custom validation
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(3000);
}

bootstrap();
