import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../shared/filter/base-repository';
import { EvaluationQuestion } from './entities/evaluation_question.entity';

@Injectable()
export class EvaluationQuestionRepository extends BaseRepository<EvaluationQuestion> {
  constructor(dataSource: DataSource) {
    super(EvaluationQuestion, dataSource);
  }
}
