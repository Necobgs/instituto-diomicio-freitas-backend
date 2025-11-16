import { Module } from '@nestjs/common';
import { EvaluationFieldService } from './evaluation_field.service';
import { EvaluationFieldController } from './evaluation_field.controller';

@Module({
  controllers: [EvaluationFieldController],
  providers: [EvaluationFieldService],
})
export class EvaluationFieldModule {}
