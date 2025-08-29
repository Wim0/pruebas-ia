/*
 * ----------------------------------------------------------------
 * ARCHIVO: apps/api/src/suggestions/suggestions.service.ts
 * ----------------------------------------------------------------
 * Propósito: Contiene la lógica de negocio. Construye el prompt,
 * llama al servicio de AWS y guarda el resultado en la base de datos.
 */
import { Injectable, Logger } from '@nestjs/common';
import { AwsService } from '../aws/aws.service';
import { TemplatesService } from '../templates/templates.service';

@Injectable()
export class SuggestionsService {
  private readonly logger = new Logger(SuggestionsService.name);

  constructor(
    private readonly awsService: AwsService,
    private readonly templatesService: TemplatesService,
  ) {}

  async generateSuggestion(
    userContext: string,
    userId?: string,
  ): Promise<string> {
    this.logger.log(`Generating suggestion for context: "${userContext}"`);

    const promptTemplate = `
Eres un asistente experto en ISO 27001 y seguridad de la información. 

CONTEXTO: El usuario necesita completar el siguiente campo en una plantilla de Política de Seguridad ISO 27001: "${userContext}"

INSTRUCCIONES:
1. Busca en la documentación de la empresa información relevante relacionada con: ${userContext}
2. Genera una respuesta específica, profesional y directamente aplicable
3. El texto debe ser adecuado para insertarse directamente en una política formal
4. Mantén un tono profesional y técnico apropiado para documentación ISO 27001
5. Si no encuentras información específica, genera una respuesta estándar basada en mejores prácticas de ISO 27001
6. La respuesta debe ser de 2-4 párrafos máximo
7. No incluyas introducciones como "Aquí tienes una sugerencia" - ve directo al contenido

RESPONDE ÚNICAMENTE CON EL CONTENIDO SOLICITADO:`;

    const suggestion =
      await this.awsService.retrieveAndGenerate(promptTemplate);

    // Guardar automáticamente el campo en la base de datos
    try {
      await this.templatesService.saveTemplateField({
        fieldContext: userContext,
        fieldContent: suggestion,
        userId: userId,
        templateType: 'iso27001',
        isCompleted: true,
      });
      this.logger.log(`Field saved to database for context: "${userContext}"`);
    } catch (error) {
      this.logger.error(`Error saving field to database: ${error}`);
      // No fallar la respuesta si el guardado falla
    }

    return suggestion;
  }
}
