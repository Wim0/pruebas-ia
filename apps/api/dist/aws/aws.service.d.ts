import { ConfigService } from '@nestjs/config';
export declare class AwsService {
    private configService;
    private readonly logger;
    private readonly s3Client;
    private readonly bedrockAgentClient;
    constructor(configService: ConfigService);
    uploadFileToS3(file: Express.Multer.File): Promise<string>;
    retrieveAndGenerate(prompt: string): Promise<string>;
}
