/*
 * ----------------------------------------------------------------
 * ARCHIVO: apps/api/src/aws/aws.controller.ts
 * ----------------------------------------------------------------
 * Propósito: El endpoint para la subida de archivos sin autenticación.
 */
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Logger,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsService } from './aws.service';

@Controller('files') // ✅ SIN @UseGuards
export class AwsController {
  private readonly logger = new Logger(AwsController.name);

  constructor(private readonly awsService: AwsService) {}

  @Post('upload') // ✅ SIN @Roles
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

    // Sin userId, usar timestamp para hacer único el nombre
    const fileName = `uploads/${Date.now()}-${file.originalname}`;

    await this.awsService.uploadFile(fileName, file.buffer);

    return {
      message: 'Archivo subido a S3 correctamente.',
      file: {
        id: fileName,
        name: file.originalname,
        size: file.size,
        uploadDate: new Date(),
      },
    };
  }

  @Get('list') // ✅ SIN @Roles
  async listDocuments() {
    const files = await this.awsService.listAllFiles();

    return {
      files: files,
    };
  }

  @Delete(':fileId') // ✅ SIN @Roles
  async deleteDocument(@Param('fileId') fileId: string) {
    // Decodificar el fileId que viene como parámetro de URL
    const decodedFileId = decodeURIComponent(fileId);

    await this.awsService.deleteFile(decodedFileId);

    return {
      message: 'Archivo eliminado correctamente',
    };
  }
}
