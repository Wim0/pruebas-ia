/*
 * ----------------------------------------------------------------
 * ARCHIVO: apps/api/src/templates/templates.module.ts
 * ----------------------------------------------------------------
 * Propósito: Módulo para la lógica de las plantillas con persistencia
 * en base de datos.
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplatesController } from './templates.controller';
import { TemplatesService } from './templates.service';
import { TemplateField } from '../entities/template-field.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TemplateField])],
  controllers: [TemplatesController],
  providers: [TemplatesService],
  exports: [TemplatesService],
})
export class TemplatesModule {}
