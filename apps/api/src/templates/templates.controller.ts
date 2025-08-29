/*
 * ----------------------------------------------------------------
 * ARCHIVO: apps/api/src/templates/templates.controller.ts
 * ----------------------------------------------------------------
 * Propósito: Endpoints para plantillas y persistencia de campos completados.
 */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClerkAuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/roles.decorator';
import { TemplatesService } from './templates.service';
import {
  CreateTemplateFieldDto,
  UpdateTemplateFieldDto,
} from './dto/template-field.dto';

@Controller('templates')
// @UseGuards(ClerkAuthGuard) // Comentado temporalmente para pruebas
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Get('iso27001')
  // @Roles('cliente')
  getIsoTemplate() {
    return {
      html: this.templatesService.getIsoTemplate(),
    };
  }

  // Guardar un campo completado
  @Post('fields')
  async saveTemplateField(
    @Body() createTemplateFieldDto: CreateTemplateFieldDto,
  ) {
    const templateField = await this.templatesService.saveTemplateField(
      createTemplateFieldDto,
    );
    return {
      success: true,
      message: 'Campo guardado exitosamente',
      data: templateField,
    };
  }

  // Obtener todos los campos completados
  @Get('fields')
  async getTemplateFields(
    @Query('userId') userId?: string,
    @Query('templateType') templateType: string = 'iso27001',
  ) {
    const fields = await this.templatesService.getTemplateFields(
      userId,
      templateType,
    );
    return {
      success: true,
      data: fields,
    };
  }

  // Obtener un campo específico por contexto
  @Get('fields/context/:fieldContext')
  async getTemplateFieldByContext(
    @Param('fieldContext') fieldContext: string,
    @Query('userId') userId?: string,
    @Query('templateType') templateType: string = 'iso27001',
  ) {
    const field = await this.templatesService.getTemplateFieldByContext(
      fieldContext,
      userId,
      templateType,
    );
    return {
      success: true,
      data: field,
    };
  }

  // Actualizar un campo
  @Put('fields/:id')
  async updateTemplateField(
    @Param('id') id: string,
    @Body() updateTemplateFieldDto: UpdateTemplateFieldDto,
  ) {
    const templateField = await this.templatesService.updateTemplateField(
      id,
      updateTemplateFieldDto,
    );
    return {
      success: true,
      message: 'Campo actualizado exitosamente',
      data: templateField,
    };
  }

  // Eliminar un campo
  @Delete('fields/:id')
  async deleteTemplateField(@Param('id') id: string) {
    await this.templatesService.deleteTemplateField(id);
    return {
      success: true,
      message: 'Campo eliminado exitosamente',
    };
  }

  // Reiniciar todos los campos (eliminar todo el progreso)
  @Delete('fields')
  async deleteAllTemplateFields(
    @Query('userId') userId?: string,
    @Query('templateType') templateType: string = 'iso27001',
  ) {
    await this.templatesService.deleteAllTemplateFields(userId, templateType);
    return {
      success: true,
      message: 'Progreso reiniciado exitosamente',
    };
  }
}
