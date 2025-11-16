import { Injectable } from '@nestjs/common';
import { CreateEvaluationQuestionDto } from './dto/create-evaluation_question.dto';
import { UpdateEvaluationQuestionDto } from './dto/update-evaluation_question.dto';

@Injectable()
export class EvaluationQuestionService {
  create(createEvaluationQuestionDto: CreateEvaluationQuestionDto) {
    return 'This action adds a new evaluationQuestion';
  }

  findAll() {
    return `This action returns all evaluationQuestion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} evaluationQuestion`;
  }

  update(id: number, updateEvaluationQuestionDto: UpdateEvaluationQuestionDto) {
    return `This action updates a #${id} evaluationQuestion`;
  }

  remove(id: number) {
    return `This action removes a #${id} evaluationQuestion`;
  }
}
