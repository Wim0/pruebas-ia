import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('template_fields')
export class TemplateField {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', nullable: true })
  userId: string;

  @Column({ name: 'field_context' })
  fieldContext: string;

  @Column({ name: 'field_content', type: 'text' })
  fieldContent: string;

  @Column({ name: 'template_type', default: 'iso27001' })
  templateType: string;

  @Column({ name: 'is_completed', default: true })
  isCompleted: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
