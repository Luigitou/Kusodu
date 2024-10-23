import { ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToRpc().getData();

    request.body = {
      username: request.username,
      password: request.password,
    };

    return super.canActivate(context);
  }

  handleRequest(err, user, info, context) {
    if (err || !user) {
      throw new RpcException({
        status: HttpStatus.UNAUTHORIZED,
        message: 'Invalid credentials',
      });
    }
    return user;
  }
}
