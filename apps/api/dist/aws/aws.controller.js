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
var AwsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const auth_guard_1 = require("../auth/auth.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const aws_service_1 = require("./aws.service");
let AwsController = AwsController_1 = class AwsController {
    awsService;
    logger = new common_1.Logger(AwsController_1.name);
    constructor(awsService) {
        this.awsService = awsService;
    }
    async uploadDocument(file) {
        this.logger.log(`Received file: ${file.originalname} for S3 upload.`);
        const fileUrl = await this.awsService.uploadFileToS3(file);
        return {
            message: 'Archivo subido a S3. Recuerda sincronizar la Base de Conocimiento en la consola de AWS para que la IA lo utilice.',
            fileUrl: fileUrl,
        };
    }
};
exports.AwsController = AwsController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, roles_decorator_1.Roles)('cliente'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }),
            new common_1.FileTypeValidator({ fileType: 'application/pdf' }),
        ],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AwsController.prototype, "uploadDocument", null);
exports.AwsController = AwsController = AwsController_1 = __decorate([
    (0, common_1.Controller)('files'),
    (0, common_1.UseGuards)(auth_guard_1.ClerkAuthGuard),
    __metadata("design:paramtypes", [aws_service_1.AwsService])
], AwsController);
//# sourceMappingURL=aws.controller.js.map