import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService as NestJwtService, JwtSignOptions } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class JwtService {
  constructor(private readonly jwtService: NestJwtService) {}

  generateToken(payload: User, options?: JwtSignOptions) {
    const payloadToSign = { userId: payload.id, email: payload.email };
    return this.jwtService.sign(payloadToSign, options);
  }

  verifyToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.UNAUTHORIZED,
        message: `Invalid token : ${error}`,
      });
    }
  }

  decodeToken(token: string) {
    return this.jwtService.decode(token);
  }
}
