/*
 * ----------------------------------------------------------------
 * ARCHIVO: apps/api/src/suggestions/suggestions.module.ts
 * ----------------------------------------------------------------
 * Propósito: El módulo para la lógica de sugerencias. Importa
 * el AwsModule y TemplatesModule para poder usar sus servicios.
 */
import { Module } from '@nestjs/common';
import { SuggestionsController } from './suggestions.controller';
import { SuggestionsService } from './suggestions.service';
import { AwsModule } from '../aws/aws.module';
import { TemplatesModule } from '../templates/templates.module';

@Module({
  imports: [AwsModule, TemplatesModule], // Importamos AWS y Templates
  controllers: [SuggestionsController],
  providers: [SuggestionsService],
})
export class SuggestionsModule {}
