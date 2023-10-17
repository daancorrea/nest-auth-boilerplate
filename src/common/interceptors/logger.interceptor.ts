import {
  Injectable,
  Inject,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { Logger } from 'winston';
import { Observable, tap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(@Inject('winston') private logger: Logger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const reqId = uuidv4();
    this.log(context.switchToHttp().getRequest(), reqId);
    return next.handle().pipe(
      tap({
        next: (data) => {
          const status = context.switchToHttp().getResponse().statusCode;
          this.logResponse(data, reqId, status);
        },
        error: (err) => {
          if (err instanceof HttpException) {
            const status = err.getStatus();
            this.logResponseError(err.getResponse(), reqId, status);
          }
          this.logError(err, reqId);
        },
      }),
    );
  }

  private log(req, id) {
    const body = { ...req.body };
    const user = (req as any).user;
    const user_id = user ? user.id : null;
    this.logger.info({
      id,
      timestamp: new Date().toISOString(),
      method: req.method,
      route: req.route.path,
      data: {
        body: body,
        query: req.query,
        params: req.params,
      },
      from: req.ip,
      made_by: user_id,
    });
  }

  private logError(err, id) {
    this.logger.error({
      id,
      timestamp: new Date().toISOString(),
      error: err.stack,
    });
  }

  private logResponse(response: any, request_id: string, status?: number) {
    this.logger.info({
      request_id,
      response,
      status,
    });
  }

  private logResponseError(response: any, request_id: string, status?: number) {
    this.logger.error({
      request_id,
      response,
      status,
    });
  }
}
