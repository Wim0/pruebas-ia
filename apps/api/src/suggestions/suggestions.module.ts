/*
 * ----------------------------------------------------------------
 * ARCHIVO: apps/api/src/suggestions/suggestions.module.ts
 * ----------------------------------------------------------------
 * Propósito: El módulo para la lógica de sugerencias. Importa
 * el AwsModule para poder usar el AwsService.
 */
import { Module } from '@nestjs/common';
import { SuggestionsController } from './suggestions.controller';
import { SuggestionsService } from './suggestions.service';
import { AwsModule } from '../aws/aws.module';

@Module({
  imports: [AwsModule], // Importamos el módulo de AWS
  controllers: [SuggestionsController],
  providers: [SuggestionsService],
})
export class SuggestionsModule {}
