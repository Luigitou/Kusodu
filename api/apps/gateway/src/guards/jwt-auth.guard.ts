import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const excludePaths = [
      '/auth/login',
      '/auth/register',
      '/auth/refresh-token',
    ];

    if (excludePaths.includes(request.url)) {
      return true;
    }

    return super.canActivate(context);
  }
}
