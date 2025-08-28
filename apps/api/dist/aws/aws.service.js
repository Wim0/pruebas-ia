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
var AwsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_s3_1 = require("@aws-sdk/client-s3");
const client_bedrock_agent_runtime_1 = require("@aws-sdk/client-bedrock-agent-runtime");
let AwsService = AwsService_1 = class AwsService {
    configService;
    logger = new common_1.Logger(AwsService_1.name);
    s3Client;
    bedrockAgentClient;
    constructor(configService) {
        this.configService = configService;
        const region = this.configService.getOrThrow('AWS_REGION');
        const credentials = {
            accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY_ID'),
            secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
        };
        this.s3Client = new client_s3_1.S3Client({ region, credentials });
        this.bedrockAgentClient = new client_bedrock_agent_runtime_1.BedrockAgentRuntimeClient({
            region,
            credentials,
        });
    }
    async uploadFileToS3(file) {
        const bucketName = this.configService.get('AWS_S3_BUCKET_NAME');
        const fileName = `${Date.now()}-${file.originalname}`;
        this.logger.log(`Uploading ${fileName} to bucket ${bucketName}`);
        const command = new client_s3_1.PutObjectCommand({
            Bucket: bucketName,
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype,
        });
        await this.s3Client.send(command);
        return `s3://${bucketName}/${fileName}`;
    }
    async uploadFile(fileName, fileBuffer) {
        const bucketName = this.configService.getOrThrow('AWS_S3_BUCKET_NAME');
        this.logger.log(`Uploading ${fileName} to bucket ${bucketName}`);
        const command = new client_s3_1.PutObjectCommand({
            Bucket: bucketName,
            Key: fileName,
            Body: fileBuffer,
            ContentType: 'application/pdf',
        });
        await this.s3Client.send(command);
        return `s3://${bucketName}/${fileName}`;
    }
    async listUserFiles(userId) {
        const bucketName = this.configService.getOrThrow('AWS_S3_BUCKET_NAME');
        const command = new client_s3_1.ListObjectsV2Command({
            Bucket: bucketName,
            Prefix: `${userId}/`,
        });
        const response = await this.s3Client.send(command);
        if (!response.Contents) {
            return [];
        }
        const files = await Promise.all(response.Contents.map((object) => {
            const key = object.Key || '';
            return {
                id: key,
                name: key.split('/').pop() || key,
                size: object.Size || 0,
                uploadDate: object.LastModified || new Date(),
            };
        }));
        return files;
    }
    async listAllFiles() {
        const bucketName = this.configService.getOrThrow('AWS_S3_BUCKET_NAME');
        this.logger.log(`Listing files from bucket: ${bucketName} with prefix: uploads/`);
        const region = this.configService.getOrThrow('AWS_REGION');
        this.logger.log(`Using AWS region: ${region}`);
        this.logger.log(`Using bucket: ${bucketName}`);
        const command = new client_s3_1.ListObjectsV2Command({
            Bucket: bucketName,
            Prefix: 'uploads/',
        });
        try {
            const response = await this.s3Client.send(command);
            this.logger.log(`Found ${response.Contents?.length || 0} files in S3`);
            if (!response.Contents) {
                return [];
            }
            const files = response.Contents.map((object) => {
                const key = object.Key || '';
                return {
                    id: key,
                    name: key.split('/').pop() || key,
                    size: object.Size || 0,
                    uploadDate: object.LastModified || new Date(),
                };
            });
            return files;
        }
        catch (error) {
            this.logger.error('Error listing files from S3:', {
                errorMessage: error.message,
                errorCode: error.code,
                errorName: error.name,
                bucket: bucketName,
                region: region,
            });
            console.error('Full S3 Error:', error);
            throw new Error(`Failed to list files from S3: ${error.message}`);
        }
    }
    async deleteFile(fileName) {
        const bucketName = this.configService.getOrThrow('AWS_S3_BUCKET_NAME');
        await this.s3Client.send(new client_s3_1.DeleteObjectCommand({
            Bucket: bucketName,
            Key: fileName,
        }));
    }
    async retrieveAndGenerate(prompt) {
        const knowledgeBaseId = this.configService.get('BEDROCK_KNOWLEDGE_BASE_ID');
        const modelArn = this.configService.get('BEDROCK_MODEL_ARN');
        this.logger.log(`Querying Knowledge Base ${knowledgeBaseId}`);
        const command = new client_bedrock_agent_runtime_1.RetrieveAndGenerateCommand({
            input: { text: prompt },
            retrieveAndGenerateConfiguration: {
                type: 'KNOWLEDGE_BASE',
                knowledgeBaseConfiguration: {
                    knowledgeBaseId,
                    modelArn,
                },
            },
        });
        try {
            const response = await this.bedrockAgentClient.send(command);
            return (response.output?.text ||
                'No se pudo generar una sugerencia desde Bedrock.');
        }
        catch (error) {
            this.logger.error('Error querying Bedrock Knowledge Base:', error);
            throw new Error('Failed to retrieve and generate from Bedrock.');
        }
    }
};
exports.AwsService = AwsService;
exports.AwsService = AwsService = AwsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AwsService);
//# sourceMappingURL=aws.service.js.map