/*
 * ----------------------------------------------------------------
 * ARCHIVO: apps/api/src/app.module.ts
 * ----------------------------------------------------------------
 * Propósito: El módulo raíz. Importa todos los demás módulos
 * de funcionalidades y configura módulos globales como el de Configuración.
 */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AwsModule } from './aws/aws.module';
import { SuggestionsModule } from './suggestions/suggestions.module';
import { TemplatesModule } from './templates/templates.module';

@Module({
  imports: [
    // Hace que las variables de entorno estén disponibles en toda la app
    ConfigModule.forRoot({ isGlobal: true }),
    AwsModule,
    SuggestionsModule,
    TemplatesModule,
  ],
})
export class AppModule {}
