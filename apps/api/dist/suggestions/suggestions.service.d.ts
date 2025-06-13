import { AwsService } from '../aws/aws.service';
export declare class SuggestionsService {
    private readonly awsService;
    private readonly logger;
    constructor(awsService: AwsService);
    generateSuggestion(userContext: string): Promise<string>;
}
