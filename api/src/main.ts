import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: (origin, callback) => {
      const allowedOriginRegex = new RegExp(
        '^(?:https://(?:www.)?kusodu.com|http://localhost(?::d+)?)$',
      );

      console.log(
        'origin',
        origin,
        'allowed by regex',
        allowedOriginRegex.test(origin),
      );

      if (!origin || allowedOriginRegex.test(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(5000);
}

bootstrap();
