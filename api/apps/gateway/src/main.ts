import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as process from 'node:process';
import { RpcExceptionInterceptor } from '@app/libs/exception/rpc-exception.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);

  const config = new DocumentBuilder()
    .setTitle('NestJS React Microservice Template')
    .setDescription('NestJS React Microservice Template')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  app.useGlobalInterceptors(new RpcExceptionInterceptor());
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
}

bootstrap();
