import { AwsService } from './aws.service';
export declare class AwsController {
    private readonly awsService;
    private readonly logger;
    constructor(awsService: AwsService);
    uploadDocument(file: Express.Multer.File): Promise<{
        message: string;
        fileUrl: string;
    }>;
}
