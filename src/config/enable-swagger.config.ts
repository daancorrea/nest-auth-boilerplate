import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const enableSwaggerConfig = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Boilerplate Auth API')
    .setDescription('Boilerplate auth API')
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
};
