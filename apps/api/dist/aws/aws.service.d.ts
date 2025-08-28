import { ConfigService } from '@nestjs/config';
export declare class AwsService {
    private configService;
    private readonly logger;
    private readonly s3Client;
    private readonly bedrockAgentClient;
    constructor(configService: ConfigService);
    uploadFileToS3(file: Express.Multer.File): Promise<string>;
    uploadFile(fileName: string, fileBuffer: Buffer): Promise<string>;
    listUserFiles(userId: string): Promise<{
        id: string;
        name: string;
        size: number;
        uploadDate: Date;
    }[]>;
    listAllFiles(): Promise<{
        id: string;
        name: string;
        size: number;
        uploadDate: Date;
    }[]>;
    deleteFile(fileName: string): Promise<void>;
    retrieveAndGenerate(prompt: string): Promise<string>;
}
