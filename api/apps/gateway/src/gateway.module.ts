import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { PrismaService } from '@app/libs/prisma/prisma.service';
import { LoggerService } from '@app/libs/logger/logger.service';
import { LoggerInterceptor } from '@app/libs/logger/logger.interceptor';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { microservicesConfig } from '@app/libs/config/microservices/microservices.config';
import { ClientsModule } from '@nestjs/microservices';
import { PingController } from './controllers/ping.controller';
import { AuthenticationController } from './controllers/authentication.controller';
import { JwtModule } from '@app/libs/jwt/jwt.module';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './guards/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(5000),
        JWT_SECRET: Joi.string().required(),
        DATABASE_URL: Joi.string().required(),
      }),
      envFilePath: ['env.local', '.env'],
    }),
    ClientsModule.register(microservicesConfig),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule,
  ],
  controllers: [AuthenticationController, PingController],
  providers: [
    GatewayService,
    PrismaService,
    LoggerService,
    JwtStrategy,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [PrismaService, LoggerService],
})
export class GatewayModule {}
