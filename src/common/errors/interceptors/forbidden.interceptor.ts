import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  ForbiddenException,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { ForbiddenError } from '../types';

@Injectable()
export class ForbiddenInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof ForbiddenError) {
          throw new ForbiddenException(err.message);
        } else {
          throw err;
        }
      }),
    );
  }
}
