/*
 * ----------------------------------------------------------------
 * ARCHIVO: apps/api/src/templates/templates.service.ts
 * ----------------------------------------------------------------
 * Propósito: Servicio para manejar plantillas y persistencia de campos
 * completados en base de datos.
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { TemplateField } from '../entities/template-field.entity';
import {
  CreateTemplateFieldDto,
  UpdateTemplateFieldDto,
} from './dto/template-field.dto';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectRepository(TemplateField)
    private templateFieldRepository: Repository<TemplateField>,
  ) {}

  // Obtener plantilla ISO 27001 (HTML estático)
  getIsoTemplate(): string {
    return `
      <div class="iso27001-template">
        <h1>Política de Seguridad de la Información - ISO 27001</h1>
        
        <div class="template-section">
          <h2>1. Introducción</h2>
          <p>La presente política establece el marco de referencia para la gestión de la seguridad de la información en <span class="fillable-field" data-context="nombre de la organización">[NOMBRE DE LA ORGANIZACIÓN]</span>, en cumplimiento con los requisitos de la norma ISO/IEC 27001:2022.</p>
          
          <h3>1.1 Propósito</h3>
          <div class="fillable-field" data-context="propósito de la política de seguridad">
            Haga clic aquí para definir el propósito específico de esta política de seguridad para su organización...
          </div>
        </div>

        <div class="template-section">
          <h2>A.5 Políticas de Seguridad</h2>
          
          <h3>A.5.1 Políticas para la seguridad de la información</h3>
          <p><strong>Control:</strong> Se debe definir un conjunto de políticas para la seguridad de la información, aprobado por la dirección, publicado y comunicado a los empleados y partes externas relevantes.</p>
          
          <div class="fillable-field" data-context="políticas específicas de seguridad de la información">
            Describa las políticas específicas de seguridad de la información que implementa su organización...
          </div>

          <h3>A.5.2 Revisión de las políticas de seguridad</h3>
          <p><strong>Control:</strong> Las políticas para la seguridad de la información se deben revisar a intervalos planificados o si ocurren cambios significativos.</p>
          
          <div class="fillable-field" data-context="proceso de revisión de políticas de seguridad">
            Defina el proceso y frecuencia de revisión de las políticas de seguridad...
          </div>
        </div>

        <div class="template-section">
          <h2>A.6 Organización de la Seguridad de la Información</h2>
          
          <h3>A.6.1 Organización interna</h3>
          <p><strong>Control:</strong> Se debe establecer un marco de gestión para iniciar y controlar la implementación y operación de la seguridad de la información dentro de la organización.</p>
          
          <div class="fillable-field" data-context="estructura organizacional de seguridad">
            Describa la estructura organizacional responsable de la seguridad de la información...
          </div>

          <h3>A.6.2 Dispositivos móviles y teletrabajo</h3>
          <div class="fillable-field" data-context="políticas de dispositivos móviles y teletrabajo">
            Establezca las políticas y procedimientos para el uso seguro de dispositivos móviles y teletrabajo...
          </div>
        </div>

        <div class="template-section">
          <h2>A.7 Seguridad de Recursos Humanos</h2>
          
          <h3>A.7.1 Antes del empleo</h3>
          <p><strong>Control:</strong> Las verificaciones de antecedentes de todos los candidatos a empleo se deben llevar a cabo de acuerdo con las leyes, reglamentos y ética pertinentes.</p>
          
          <div class="fillable-field" data-context="proceso de verificación de antecedentes">
            Describa el proceso de verificación de antecedentes y evaluación de empleados...
          </div>

          <h3>A.7.2 Durante el empleo</h3>
          <div class="fillable-field" data-context="responsabilidades de seguridad durante el empleo">
            Defina las responsabilidades y procedimientos de seguridad durante la relación laboral...
          </div>

          <h3>A.7.3 Terminación y cambio de empleo</h3>
          <div class="fillable-field" data-context="proceso de terminación de empleo">
            Establezca los procedimientos para la terminación o cambio de empleo, incluyendo devolución de activos...
          </div>
        </div>

        <div class="template-section">
          <h2>A.8 Gestión de Activos</h2>
          
          <h3>A.8.1 Responsabilidad por los activos</h3>
          <p><strong>Control:</strong> Los activos asociados con información e instalaciones de procesamiento de información se deben identificar, y se deben definir e implementar responsabilidades de protección.</p>
          
          <div class="fillable-field" data-context="inventario de activos de información">
            Describa el proceso de inventario y clasificación de activos de información...
          </div>

          <h3>A.8.2 Clasificación de la información</h3>
          <div class="fillable-field" data-context="esquema de clasificación de información">
            Defina el esquema de clasificación de la información y las etiquetas de seguridad...
          </div>

          <h3>A.8.3 Manejo de medios</h3>
          <div class="fillable-field" data-context="procedimientos de manejo de medios">
            Establezca los procedimientos para el manejo seguro de medios de almacenamiento...
          </div>
        </div>

        <div class="template-section">
          <h2>2. Aplicabilidad</h2>
          <div class="fillable-field" data-context="alcance y aplicabilidad de la política">
            Defina el alcance y aplicabilidad de esta política dentro de la organización...
          </div>
        </div>

        <div class="template-section">
          <h2>3. Responsabilidades</h2>
          <div class="fillable-field" data-context="roles y responsabilidades específicas">
            Detalle los roles y responsabilidades específicas para la implementación de esta política...
          </div>
        </div>

        <div class="template-section">
          <h2>4. Cumplimiento</h2>
          <div class="fillable-field" data-context="mecanismos de cumplimiento y monitoreo">
            Describa los mecanismos de cumplimiento, monitoreo y consecuencias por incumplimiento...
          </div>
        </div>

        <div class="template-section">
          <h2>5. Revisión y Actualización</h2>
          <p>Esta política será revisada anualmente o cuando sea necesario debido a cambios en:</p>
          <div class="fillable-field" data-context="criterios para revisión de la política">
            Establezca los criterios específicos que triggearán una revisión de esta política...
          </div>
        </div>

        <div class="template-footer">
          <p><strong>Fecha de aprobación:</strong> <span class="fillable-field" data-context="fecha de aprobación">[FECHA]</span></p>
          <p><strong>Aprobado por:</strong> <span class="fillable-field" data-context="autoridad que aprueba">[CARGO Y NOMBRE]</span></p>
          <p><strong>Próxima revisión:</strong> <span class="fillable-field" data-context="fecha de próxima revisión">[FECHA]</span></p>
        </div>
      </div>
    `;
  }

  // Guardar un campo completado
  async saveTemplateField(
    createTemplateFieldDto: CreateTemplateFieldDto,
  ): Promise<TemplateField> {
    // Verificar si ya existe el campo para este contexto y usuario
    const whereCondition: any = {
      fieldContext: createTemplateFieldDto.fieldContext,
      templateType: createTemplateFieldDto.templateType || 'iso27001',
    };

    // Manejar el userId - si es undefined o null, usar IsNull()
    if (createTemplateFieldDto.userId) {
      whereCondition.userId = createTemplateFieldDto.userId;
    } else {
      whereCondition.userId = IsNull();
    }

    const existingField = await this.templateFieldRepository.findOne({
      where: whereCondition,
    });

    if (existingField) {
      // Actualizar el campo existente
      existingField.fieldContent = createTemplateFieldDto.fieldContent;
      existingField.isCompleted = createTemplateFieldDto.isCompleted ?? true;
      return await this.templateFieldRepository.save(existingField);
    } else {
      // Crear nuevo campo
      const templateField = this.templateFieldRepository.create(
        createTemplateFieldDto,
      );
      return await this.templateFieldRepository.save(templateField);
    }
  }

  // Obtener todos los campos completados para un usuario
  async getTemplateFields(
    userId?: string,
    templateType: string = 'iso27001',
  ): Promise<TemplateField[]> {
    const whereCondition: any = {
      templateType,
    };

    // Manejar el userId - si es undefined o null, usar IsNull()
    if (userId) {
      whereCondition.userId = userId;
    } else {
      whereCondition.userId = IsNull();
    }

    return await this.templateFieldRepository.find({
      where: whereCondition,
      order: {
        updatedAt: 'DESC',
      },
    });
  }

  // Obtener un campo específico por contexto
  async getTemplateFieldByContext(
    fieldContext: string,
    userId?: string,
    templateType: string = 'iso27001',
  ): Promise<TemplateField | null> {
    const whereCondition: any = {
      fieldContext,
      templateType,
    };

    // Manejar el userId - si es undefined o null, usar IsNull()
    if (userId) {
      whereCondition.userId = userId;
    } else {
      whereCondition.userId = IsNull();
    }

    return await this.templateFieldRepository.findOne({
      where: whereCondition,
    });
  }

  // Actualizar un campo
  async updateTemplateField(
    id: string,
    updateTemplateFieldDto: UpdateTemplateFieldDto,
  ): Promise<TemplateField | null> {
    await this.templateFieldRepository.update(id, updateTemplateFieldDto);
    return await this.templateFieldRepository.findOne({ where: { id } });
  }

  // Eliminar un campo
  async deleteTemplateField(id: string): Promise<void> {
    await this.templateFieldRepository.delete(id);
  }

  // Eliminar todos los campos de un usuario (para reiniciar progreso)
  async deleteAllTemplateFields(
    userId?: string,
    templateType: string = 'iso27001',
  ): Promise<void> {
    const whereCondition: any = {
      templateType,
    };

    // Manejar el userId - si es undefined o null, usar IsNull()
    if (userId) {
      whereCondition.userId = userId;
    } else {
      whereCondition.userId = IsNull();
    }

    await this.templateFieldRepository.delete(whereCondition);
  }
}
