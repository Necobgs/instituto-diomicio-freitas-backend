import { Module } from '@nestjs/common';
import { EvaluationFieldTypeService } from './evaluation_field_type.service';
import { EvaluationFieldTypeController } from './evaluation_field_type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluationFieldType } from './entities/evaluation_field_type.entity';
import { EvaluationFieldTypeRepository } from './evaluation_field_type.repository';

@Module({
  imports: [TypeOrmModule.forFeature([EvaluationFieldType])],
  controllers: [EvaluationFieldTypeController],
  providers: [EvaluationFieldTypeService, EvaluationFieldTypeRepository],
  exports: [EvaluationFieldTypeService, EvaluationFieldTypeRepository],
})
export class EvaluationFieldTypeModule {}
