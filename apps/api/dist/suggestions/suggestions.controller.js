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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuggestionsController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/auth.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const suggestions_service_1 = require("./suggestions.service");
const suggestion_dto_1 = require("./dto/suggestion.dto");
let SuggestionsController = class SuggestionsController {
    suggestionsService;
    constructor(suggestionsService) {
        this.suggestionsService = suggestionsService;
    }
    async generateSuggestion(suggestionDto) {
        const suggestion = await this.suggestionsService.generateSuggestion(suggestionDto.context);
        return { suggestion };
    }
};
exports.SuggestionsController = SuggestionsController;
__decorate([
    (0, common_1.Post)('generate'),
    (0, roles_decorator_1.Roles)('cliente'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [suggestion_dto_1.SuggestionDto]),
    __metadata("design:returntype", Promise)
], SuggestionsController.prototype, "generateSuggestion", null);
exports.SuggestionsController = SuggestionsController = __decorate([
    (0, common_1.Controller)('suggestions'),
    (0, common_1.UseGuards)(auth_guard_1.ClerkAuthGuard),
    __metadata("design:paramtypes", [suggestions_service_1.SuggestionsService])
], SuggestionsController);
//# sourceMappingURL=suggestions.controller.js.map