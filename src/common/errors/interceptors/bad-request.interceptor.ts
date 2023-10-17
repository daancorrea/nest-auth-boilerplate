import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  BadRequestException,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { BadRequestError } from '../types';

@Injectable()
export class BadRequestInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof BadRequestError) {
          throw new BadRequestException(err.message);
        } else {
          throw err;
        }
      }),
    );
  }
}
