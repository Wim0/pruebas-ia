/*
 * ----------------------------------------------------------------
 * ARCHIVO: apps/api/src/templates/templates.module.ts
 * ----------------------------------------------------------------
 * Propósito: Un módulo simple para la lógica de las plantillas.
 */
import { Module } from '@nestjs/common';
import { TemplatesController } from './templates.controller';
import { TemplatesService } from './templates.service';

@Module({
  controllers: [TemplatesController],
  providers: [TemplatesService],
})
export class TemplatesModule {}
