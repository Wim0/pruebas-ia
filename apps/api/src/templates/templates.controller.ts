/*
 * ----------------------------------------------------------------
 * ARCHIVO: apps/api/src/templates/templates.controller.ts
 * ----------------------------------------------------------------
 * Propósito: El endpoint para que el frontend pida la plantilla.
 */
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ClerkAuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/roles.decorator';
import { TemplatesService } from './templates.service';

@Controller('templates')
@UseGuards(ClerkAuthGuard)
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Get('iso27001')
  @Roles('cliente')
  getIsoTemplate() {
    return {
      html: this.templatesService.getIsoTemplate(),
    };
  }
}
