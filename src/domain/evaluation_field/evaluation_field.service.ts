import { Injectable } from '@nestjs/common';
import { CreateEvaluationFieldDto } from './dto/create-evaluation_field.dto';
import { UpdateEvaluationFieldDto } from './dto/update-evaluation_field.dto';

@Injectable()
export class EvaluationFieldService {
  create(createEvaluationFieldDto: CreateEvaluationFieldDto) {
    return 'This action adds a new evaluationField';
  }

  findAll() {
    return `This action returns all evaluationField`;
  }

  findOne(id: number) {
    return `This action returns a #${id} evaluationField`;
  }

  update(id: number, updateEvaluationFieldDto: UpdateEvaluationFieldDto) {
    return `This action updates a #${id} evaluationField`;
  }

  remove(id: number) {
    return `This action removes a #${id} evaluationField`;
  }
}
