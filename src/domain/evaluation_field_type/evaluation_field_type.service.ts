import { Injectable } from '@nestjs/common';
import { CreateEvaluationFieldTypeDto } from './dto/create-evaluation_field_type.dto';
import { UpdateEvaluationFieldTypeDto } from './dto/update-evaluation_field_type.dto';

@Injectable()
export class EvaluationFieldTypeService {
  create(createEvaluationFieldTypeDto: CreateEvaluationFieldTypeDto) {
    return 'This action adds a new evaluationFieldType';
  }

  findAll() {
    return `This action returns all evaluationFieldType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} evaluationFieldType`;
  }

  update(id: number, updateEvaluationFieldTypeDto: UpdateEvaluationFieldTypeDto) {
    return `This action updates a #${id} evaluationFieldType`;
  }

  remove(id: number) {
    return `This action removes a #${id} evaluationFieldType`;
  }
}
