/*
 * ----------------------------------------------------------------
 * ARCHIVO: apps/api/src/aws/aws.controller.ts
 * ----------------------------------------------------------------
 * Propósito: El endpoint para la subida de archivos. Está protegido y
 * solo los clientes pueden subir documentos.
 */
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Logger,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ClerkAuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/roles.decorator';
import { AwsService } from './aws.service';

@Controller('files')
@UseGuards(ClerkAuthGuard)
export class AwsController {
  private readonly logger = new Logger(AwsController.name);

  constructor(private readonly awsService: AwsService) {}

  @Post('upload')
  @Roles('cliente')
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }), // 10MB
          new FileTypeValidator({ fileType: 'application/pdf' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    this.logger.log(`Received file: ${file.originalname} for S3 upload.`);
    const fileUrl = await this.awsService.uploadFileToS3(file);

    return {
      message:
        'Archivo subido a S3. Recuerda sincronizar la Base de Conocimiento en la consola de AWS para que la IA lo utilice.',
      fileUrl: fileUrl,
    };
  }
}
