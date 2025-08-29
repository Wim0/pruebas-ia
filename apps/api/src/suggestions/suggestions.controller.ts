/*
 * ----------------------------------------------------------------
 * ARCHIVO: apps/api/src/suggestions/suggestions.controller.ts
 * ----------------------------------------------------------------
 * Propósito: El endpoint que el frontend llamará para obtener
 * una sugerencia. Sin autenticación para proyecto de prueba.
 */
import { Body, Controller, Post } from '@nestjs/common';
import { SuggestionsService } from './suggestions.service';
import { SuggestionDto } from './dto/suggestion.dto';

@Controller('suggestions')
export class SuggestionsController {
  constructor(private readonly suggestionsService: SuggestionsService) {}

  @Post('generate')
  async generateSuggestion(@Body() suggestionDto: SuggestionDto) {
    const suggestion = await this.suggestionsService.generateSuggestion(
      suggestionDto.context,
    );
    return { suggestion };
  }
}
