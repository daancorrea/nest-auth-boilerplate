import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { enableSwaggerConfig } from './config/enable-swagger.config';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './config/winston.config';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import {
  ConflictInterceptor,
  ForbiddenInterceptor,
  NotFoundInterceptor,
  UnauthorizedInterceptor,
  BadRequestInterceptor,
} from './common/errors/interceptors';
import { TrimStringsPipe } from './common/transformer/trim-strings.pipe';

async function bootstrap() {
  const logger = WinstonModule.createLogger(winstonConfig);
  const app = await NestFactory.create(AppModule, { logger });
  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api/');
  app.useGlobalPipes(
    new TrimStringsPipe(),
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.enableCors({ origin: '*' });
  enableSwaggerConfig(app);
  app.useGlobalInterceptors(
    new NotFoundInterceptor(),
    new ConflictInterceptor(),
    new UnauthorizedInterceptor(),
    new ForbiddenInterceptor(),
    new BadRequestInterceptor(),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  const port = configService.get('PORT');
  await app.listen(port);
}
bootstrap();
