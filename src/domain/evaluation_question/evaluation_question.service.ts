import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEvaluationQuestionDto } from './dto/create-evaluation_question.dto';
import { UpdateEvaluationQuestionDto } from './dto/update-evaluation_question.dto';
import { FilterDto } from '../shared/filter/filter-dto';
import { EvaluationQuestionRepository } from './evaluation_question.repository';
import { EvaluationQuestion } from './entities/evaluation_question.entity';

@Injectable()
export class EvaluationQuestionService {
  constructor(
    private readonly repository: EvaluationQuestionRepository,
  ) {}

  async create(createEvaluationQuestionDto: CreateEvaluationQuestionDto) {
    const eq = this.repository.create(createEvaluationQuestionDto as any);
    return await this.repository.save(eq);
  }

  async findAll(dto: FilterDto) {
    return await this.repository.filterAll(dto);
  }

  async findOneBy<T extends keyof EvaluationQuestion>(key: T, value: EvaluationQuestion[T]) {
    const item = await this.repository.findOneBy({ [key]: value });
    if (!item) throw new NotFoundException(`Pergunta de avaliação com ${key} ${value} não encontrada`);
    return item;
  }

  async update(id: number, updateEvaluationQuestionDto: UpdateEvaluationQuestionDto) {
    const eq = await this.findOneBy('id', id);
    Object.assign(eq, updateEvaluationQuestionDto);
    return await this.repository.save(eq);
  }

  async remove(id: number) {
    const item = await this.findOneBy('id', id);
    return await this.repository.softRemove(item);
  }
}
