import { SuggestionsService } from './suggestions.service';
import { SuggestionDto } from './dto/suggestion.dto';
export declare class SuggestionsController {
    private readonly suggestionsService;
    constructor(suggestionsService: SuggestionsService);
    generateSuggestion(suggestionDto: SuggestionDto): Promise<{
        suggestion: string;
    }>;
}
