/*
 * ----------------------------------------------------------------
 * ARCHIVO: apps/api/src/suggestions/suggestions.controller.ts
 * ----------------------------------------------------------------
 * Propósito: El endpoint que el frontend llamará para obtener
 * una sugerencia. Usa el DTO para validar la petición.
 */
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ClerkAuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/roles.decorator';
import { SuggestionsService } from './suggestions.service';
import { SuggestionDto } from './dto/suggestion.dto';

@Controller('suggestions')
@UseGuards(ClerkAuthGuard)
export class SuggestionsController {
  constructor(private readonly suggestionsService: SuggestionsService) {}

  @Post('generate')
  @Roles('cliente')
  async generateSuggestion(@Body() suggestionDto: SuggestionDto) {
    const suggestion = await this.suggestionsService.generateSuggestion(
      suggestionDto.context,
    );
    return { suggestion };
  }
}
