import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { NotFoundError } from '../types';

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof NotFoundError) {
          throw new NotFoundException(err.message);
        } else {
          throw err;
        }
      }),
    );
  }
}
