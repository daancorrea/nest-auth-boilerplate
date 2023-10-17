import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

import { Request, Response } from 'express';
import { ExceptionModel, HttpExceptionModel } from './';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('EXCEPTION-FILTER');
  catch(exception: any, host: ArgumentsHost) {
    this.logger.error(JSON.stringify(exception));
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      response
        .status(status)
        .json(new HttpExceptionModel(status, exception, request.url));
    } else {
      const status = exception.response
        ? HttpStatus.UNPROCESSABLE_ENTITY
        : HttpStatus.INTERNAL_SERVER_ERROR;
      response
        .status(status)
        .json(
          new ExceptionModel(status, exception, request.url, exception.name),
        );
    }
  }
}
