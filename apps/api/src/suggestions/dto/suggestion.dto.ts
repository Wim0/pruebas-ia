/*
 * ----------------------------------------------------------------
 * ARCHIVO: apps/api/src/suggestions/dto/suggestion.dto.ts
 * ----------------------------------------------------------------
 * Propósito: Un Data Transfer Object. Define la forma de los datos
 * que esperamos recibir en el cuerpo de la petición para generar una sugerencia.
 */
import { IsNotEmpty, IsString } from 'class-validator';

export class SuggestionDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty()
  context: string;
}
