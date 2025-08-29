import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateTemplateFieldDto {
  @IsString()
  fieldContext: string;

  @IsString()
  fieldContent: string;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  templateType?: string;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}

export class UpdateTemplateFieldDto {
  @IsOptional()
  @IsString()
  fieldContent?: string;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}
