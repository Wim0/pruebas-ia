import { Controller, Get } from '@nestjs/common';
import { AwsService } from './aws/aws.service';

@Controller('test')
export class TestBedrockController {
  constructor(private readonly awsService: AwsService) {}

  @Get('bedrock')
  async testBedrock() {
    try {
      // Test simple para verificar la conexión con Bedrock
      const prompt = `
Eres un asistente experto en ISO 27001. 
Responde brevemente: ¿Cuál es el propósito de una política de seguridad de la información?
`;
      
      const response = await this.awsService.retrieveAndGenerate(prompt);
      
      return {
        success: true,
        message: 'Bedrock está funcionando correctamente',
        response: response,
        timestamp: new Date().toISOString(),
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      return {
        success: false,
        error: errorMessage,
        message: 'Error en la configuración de Bedrock',
        timestamp: new Date().toISOString(),
      };
    }
  }

  @Get('config')
  testConfig() {
    return {
      region: process.env.AWS_REGION,
      knowledgeBaseId: process.env.BEDROCK_KNOWLEDGE_BASE_ID,
      modelArn: process.env.BEDROCK_MODEL_ARN,
      bucketName: process.env.AWS_S3_BUCKET_NAME,
    };
  }
}
