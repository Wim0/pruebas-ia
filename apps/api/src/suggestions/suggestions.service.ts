/*
 * ----------------------------------------------------------------
 * ARCHIVO: apps/api/src/suggestions/suggestions.service.ts
 * ----------------------------------------------------------------
 * Propósito: Contiene la lógica de negocio. Construye el prompt
 * y llama al servicio de AWS para obtener la respuesta de la IA.
 */
import { Injectable, Logger } from '@nestjs/common';
import { AwsService } from '../aws/aws.service';

@Injectable()
export class SuggestionsService {
  private readonly logger = new Logger(SuggestionsService.name);

  constructor(private readonly awsService: AwsService) {}

  async generateSuggestion(userContext: string): Promise<string> {
    this.logger.log(`Generating suggestion for context: "${userContext}"`);

    const promptTemplate = `
      Eres un asistente experto en la implementación de la norma ISO 27001.
      Basándote en la información relevante de la empresa que se te proporcionará desde una base de conocimiento,
      genera una sugerencia de texto para completar el siguiente requisito: "${userContext}".
      La respuesta debe ser un párrafo profesional, bien redactado y directamente aplicable. No incluyas preámbulos como "Aquí tienes una sugerencia".`;

    return this.awsService.retrieveAndGenerate(promptTemplate);
  }
}
