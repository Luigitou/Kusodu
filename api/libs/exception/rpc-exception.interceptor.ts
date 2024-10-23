import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class RpcExceptionInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((error) => {
        console.log('interceptor error', error);
        const httpStatusValues = Object.values(HttpStatus).filter(
          (value) => typeof value === 'number',
        );
        if (error.status && httpStatusValues.includes(error.status)) {
          return throwError(
            () => new HttpException(error.message, error.status),
          );
        } else {
          return throwError(
            () =>
              new HttpException(
                error.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
              ),
          );
        }
      }),
    );
  }
}
