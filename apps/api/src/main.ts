/*
 * ----------------------------------------------------------------
 * ARCHIVO: apps/api/src/main.ts
 * ----------------------------------------------------------------
 * Propósito: El punto de entrada de nuestra aplicación.
 * Configura y lanza el servidor de NestJS.
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Configura el prefijo global para todas las rutas de la API
  app.setGlobalPrefix('api');

  // Habilita CORS para permitir que el frontend se comunique con la API
  app.enableCors();

  // Usa un ValidationPipe global para validar automáticamente los DTOs
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
