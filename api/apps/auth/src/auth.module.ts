import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule } from '@nestjs/microservices';
import { microservicesConfig } from '@app/libs/config/microservices/microservices.config';
import { PrismaService } from '@app/libs/prisma/prisma.service';
import { JwtModule } from '@app/libs/jwt/jwt.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { LoggerService } from '@app/libs/logger/logger.service';

@Module({
  imports: [
    ClientsModule.register(microservicesConfig),
    JwtModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, LocalStrategy, LoggerService],
  exports: [PrismaService, LoggerService],
})
export class AuthModule {}
