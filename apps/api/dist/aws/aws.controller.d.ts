import { AwsService } from './aws.service';
export declare class AwsController {
    private readonly awsService;
    private readonly logger;
    constructor(awsService: AwsService);
    uploadDocument(file: Express.Multer.File): Promise<{
        message: string;
        file: {
            id: string;
            name: string;
            size: number;
            uploadDate: Date;
        };
    }>;
    listDocuments(): Promise<{
        files: {
            id: string;
            name: string;
            size: number;
            uploadDate: Date;
        }[];
    }>;
    deleteDocument(fileId: string): Promise<{
        message: string;
    }>;
}
