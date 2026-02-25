import { Module } from '@nestjs/common';
import { EvaluationQuestionService } from './evaluation_question.service';
import { EvaluationQuestionController } from './evaluation_question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluationQuestion } from './entities/evaluation_question.entity';
import { EvaluationQuestionRepository } from './evaluation_question.repository';

@Module({
  imports: [TypeOrmModule.forFeature([EvaluationQuestion])],
  controllers: [EvaluationQuestionController],
  providers: [EvaluationQuestionService, EvaluationQuestionRepository],
  exports: [EvaluationQuestionService, EvaluationQuestionRepository],
})
export class EvaluationQuestionModule {}
