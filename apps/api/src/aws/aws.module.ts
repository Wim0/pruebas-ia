/*
 * ----------------------------------------------------------------
 * ARCHIVO: apps/api/src/aws/aws.module.ts
 * ----------------------------------------------------------------
 * Propósito: Encapsula toda la lógica de AWS. Proveemos el AwsService
 * y lo exportamos para que otros módulos puedan usarlo.
 */
import { Module } from '@nestjs/common';
import { AwsService } from './aws.service';
import { AwsController } from './aws.controller';

@Module({
  providers: [AwsService],
  controllers: [AwsController],
  exports: [AwsService], // Exportamos para que otros módulos lo puedan inyectar
})
export class AwsModule {}
