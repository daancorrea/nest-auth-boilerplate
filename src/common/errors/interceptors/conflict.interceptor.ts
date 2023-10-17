import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  ConflictException,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { ConflictError } from '../types';

@Injectable()
export class ConflictInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof ConflictError) {
          throw new ConflictException(err.message);
        } else {
          throw err;
        }
      }),
    );
  }
}
