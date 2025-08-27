"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SuggestionsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuggestionsService = void 0;
const common_1 = require("@nestjs/common");
const aws_service_1 = require("../aws/aws.service");
let SuggestionsService = SuggestionsService_1 = class SuggestionsService {
    awsService;
    logger = new common_1.Logger(SuggestionsService_1.name);
    constructor(awsService) {
        this.awsService = awsService;
    }
    async generateSuggestion(userContext) {
        this.logger.log(`Generating suggestion for context: "${userContext}"`);
        const promptTemplate = `
      Eres un asistente experto en la implementación de la norma ISO 27001.
      Basándote en la información relevante de la empresa que se te proporcionará desde una base de conocimiento,
      genera una sugerencia de texto para completar el siguiente requisito: "${userContext}".
      La respuesta debe ser un párrafo profesional, bien redactado y directamente aplicable. No incluyas preámbulos como "Aquí tienes una sugerencia".`;
        return this.awsService.retrieveAndGenerate(promptTemplate);
    }
};
exports.SuggestionsService = SuggestionsService;
exports.SuggestionsService = SuggestionsService = SuggestionsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [aws_service_1.AwsService])
], SuggestionsService);
//# sourceMappingURL=suggestions.service.js.map