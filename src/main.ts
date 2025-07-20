import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

import 'dotenv/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('CRM Backend API')
    .setDescription('Swagger docs cho hệ thống CRM')
    .setVersion('1.0')
    .addBearerAuth() // Cho phép test JWT token
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3090;
  await app.listen(port);

  const baseUrl = `http://localhost:${port}`;
  console.log(`🚀 App running at: ${baseUrl}`);
  console.log(`📚 Swagger docs: ${baseUrl}/api/docs`);
}
bootstrap();
