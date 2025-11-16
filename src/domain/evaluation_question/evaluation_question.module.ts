import { Module } from '@nestjs/common';
import { EvaluationQuestionService } from './evaluation_question.service';
import { EvaluationQuestionController } from './evaluation_question.controller';

@Module({
  controllers: [EvaluationQuestionController],
  providers: [EvaluationQuestionService],
})
export class EvaluationQuestionModule {}
