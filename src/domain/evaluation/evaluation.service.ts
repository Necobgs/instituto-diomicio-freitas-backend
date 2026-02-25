import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { FilterDto } from '../shared/filter/filter-dto';
import { EvaluationRepository } from './evaluation.repository';
import { Evaluation } from './entities/evaluation.entity';

@Injectable()
export class EvaluationService {
  constructor(
    private readonly repository: EvaluationRepository,
  ) {}

  async create(createEvaluationDto: CreateEvaluationDto) {
    const ev = this.repository.create(createEvaluationDto as any);
    return await this.repository.save(ev);
  }

  async findAll(dto: FilterDto) {
    return await this.repository.filterAll(dto);
  }

  async findOneBy<T extends keyof Evaluation>(key: T, value: Evaluation[T]) {
    const item = await this.repository.findOneBy({ [key]: value });
    if (!item) {
      throw new NotFoundException(`Avaliação com ${key} ${value} não encontrada`);
    }
    return item;
  }

  async update(id: number, updateEvaluationDto: UpdateEvaluationDto) {
    const ev = await this.findOneBy('id', id);
    Object.assign(ev, updateEvaluationDto);
    return await this.repository.save(ev);
  }

  async remove(id: number) {
    const item = await this.findOneBy('id', id);
    return await this.repository.softRemove(item);
  }
}
