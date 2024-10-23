import { HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { RpcException } from '@nestjs/microservices';
import { LoggerService } from '@app/libs/logger/logger.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private readonly logger: LoggerService,
  ) {
    super({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    });
  }

  async validate(req: any, username: any, password: any): Promise<any> {
    const user = await this.authService.validateUser({ username, password });
    if (!user) {
      const error = new RpcException({
        status: HttpStatus.UNAUTHORIZED,
        message: 'Invalid credentials',
      });
      throw error;
    }
    return user;
  }
}
