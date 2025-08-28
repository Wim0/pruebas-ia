/*
 * ----------------------------------------------------------------
 * ARCHIVO: apps/api/src/aws/aws.service.ts
 * ----------------------------------------------------------------
 * Propósito: El corazón de nuestra integración con AWS. Centraliza la
 * configuración y los clientes de los SDK de AWS (S3 y Bedrock).
 */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command, // ✅ Asegúrate de tener esta
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
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

  // Agregar este método que coincida con el controlador
  async uploadFile(fileName: string, fileBuffer: Buffer): Promise<string> {
    const bucketName =
      this.configService.getOrThrow<string>('AWS_S3_BUCKET_NAME');
    this.logger.log(`Uploading ${fileName} to bucket ${bucketName}`);

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: fileBuffer,
      ContentType: 'application/pdf',
    });

    await this.s3Client.send(command);
    return `s3://${bucketName}/${fileName}`;
  }

  // También usar ConfigService en lugar de process.env para consistencia
  async listUserFiles(userId: string) {
    const bucketName =
      this.configService.getOrThrow<string>('AWS_S3_BUCKET_NAME');
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: `${userId}/`,
    });

    const response = await this.s3Client.send(command);

    if (!response.Contents) {
      return [];
    }

    const files = await Promise.all(
      response.Contents.map((object) => {
        const key = object.Key || '';
        return {
          id: key,
          name: key.split('/').pop() || key,
          size: object.Size || 0,
          uploadDate: object.LastModified || new Date(),
        };
      }),
    );

    return files;
  }

  async listAllFiles() {
    const bucketName =
      this.configService.getOrThrow<string>('AWS_S3_BUCKET_NAME');
    this.logger.log(
      `Listing files from bucket: ${bucketName} with prefix: uploads/`,
    );

    // Agregar debug de configuración
    const region = this.configService.getOrThrow<string>('AWS_REGION');
    this.logger.log(`Using AWS region: ${region}`);
    this.logger.log(`Using bucket: ${bucketName}`);

    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: 'uploads/', // Solo archivos en la carpeta uploads
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
    } catch (error) {
      // ✅ Agregar más detalle del error
      this.logger.error('Error listing files from S3:', {
        errorMessage: error.message,
        errorCode: error.code,
        errorName: error.name,
        bucket: bucketName,
        region: region,
      });

      // ✅ También hacer log del error completo para debugging
      console.error('Full S3 Error:', error);

      throw new Error(`Failed to list files from S3: ${error.message}`);
    }
  }

  async deleteFile(fileName: string) {
    const bucketName =
      this.configService.getOrThrow<string>('AWS_S3_BUCKET_NAME');
    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: bucketName,
        Key: fileName,
      }),
    );
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
