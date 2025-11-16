import { Module } from '@nestjs/common';
import { EvaluationFieldTypeService } from './evaluation_field_type.service';
import { EvaluationFieldTypeController } from './evaluation_field_type.controller';

@Module({
  controllers: [EvaluationFieldTypeController],
  providers: [EvaluationFieldTypeService],
})
export class EvaluationFieldTypeModule {}
