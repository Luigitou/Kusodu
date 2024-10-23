import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { LoggerService } from '@app/libs/logger/logger.service';
import { catchError, Observable, tap } from 'rxjs';
import { Request, Response } from 'express';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const { method, originalUrl } = request;

    const startTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        const statusCode = response.statusCode;
        const duration = Date.now() - startTime;

        if (statusCode >= 200 && statusCode < 300) {
          this.logger.log(
            `${method} ${originalUrl} - Status: ${statusCode} - Duration: ${duration}ms`,
            'HTTP',
          );
        }
      }),
      catchError((error) => {
        const statusCode = response.statusCode;
        const duration = Date.now() - startTime;

        this.logger.error(
          `${method} ${originalUrl} - Status: ${statusCode} - Duration: ${duration}ms - Error: ${error}`,
          error.stack,
          'HTTP',
        );

        throw error;
      }),
    );
  }
}
