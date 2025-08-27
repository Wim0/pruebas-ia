/*
 * ----------------------------------------------------------------
 * ARCHIVO: apps/api/src/aws/aws.service.ts
 * ----------------------------------------------------------------
 * Propósito: El corazón de nuestra integración con AWS. Centraliza la
 * configuración y los clientes de los SDK de AWS (S3 y Bedrock).
 */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import {
  BedrockAgentRuntimeClient,
  RetrieveAndGenerateCommand,
} from '@aws-sdk/client-bedrock-agent-runtime';

@Injectable()
export class AwsService {
  private readonly logger = new Logger(AwsService.name);
  private readonly s3Client: S3Client;
  private readonly bedrockAgentClient: BedrockAgentRuntimeClient;

  constructor(private configService: ConfigService) {
    const region = this.configService.getOrThrow<string>('AWS_REGION');
    const credentials = {
      accessKeyId: this.configService.getOrThrow<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.getOrThrow<string>(
        'AWS_SECRET_ACCESS_KEY',
      ),
    };

    this.s3Client = new S3Client({ region, credentials });
    this.bedrockAgentClient = new BedrockAgentRuntimeClient({
      region,
      credentials,
    });
  }

  async uploadFileToS3(file: Express.Multer.File): Promise<string> {
    const bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');
    const fileName = `${Date.now()}-${file.originalname}`;
    this.logger.log(`Uploading ${fileName} to bucket ${bucketName}`);

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await this.s3Client.send(command);
    return `s3://${bucketName}/${fileName}`;
  }

  async retrieveAndGenerate(prompt: string): Promise<string> {
    const knowledgeBaseId = this.configService.get<string>(
      'BEDROCK_KNOWLEDGE_BASE_ID',
    );
    const modelArn = this.configService.get<string>('BEDROCK_MODEL_ARN');
    this.logger.log(`Querying Knowledge Base ${knowledgeBaseId}`);

    const command = new RetrieveAndGenerateCommand({
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
      return (
        response.output?.text ||
        'No se pudo generar una sugerencia desde Bedrock.'
      );
    } catch (error) {
      this.logger.error('Error querying Bedrock Knowledge Base:', error);
      throw new Error('Failed to retrieve and generate from Bedrock.');
    }
  }
}
