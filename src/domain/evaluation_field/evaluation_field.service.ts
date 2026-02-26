import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEvaluationFieldDto } from './dto/create-evaluation_field.dto';
import { UpdateEvaluationFieldDto } from './dto/update-evaluation_field.dto';
import { FilterDto } from '../shared/filter/filter-dto';
import { EvaluationFieldRepository } from './evaluation_field.repository';
import { EvaluationField } from './entities/evaluation_field.entity';

@Injectable()
export class EvaluationFieldService {
  constructor(
    private readonly repository: EvaluationFieldRepository,
  ) {}

  async create(createEvaluationFieldDto: CreateEvaluationFieldDto) {
    const ef = this.repository.create(createEvaluationFieldDto as any);
    return await this.repository.save(ef);
  }

  async findAll(dto: FilterDto) {
    return await this.repository.filterAll(dto);
  }

  async findOneBy<T extends keyof EvaluationField>(key: T, value: EvaluationField[T]) {
    const item = await this.repository.findOneBy({ [key]: value });
    if (!item) throw new NotFoundException(`Campo de avaliação com ${key} ${value} não encontrado`);
    return item;
  }

  async existsBy<T extends keyof EvaluationField>(key: T, value: EvaluationField[T],withDeleted:boolean=true) {
    return await this.repository.exists({
      where:{ 
        [key]: value
      },
      withDeleted
    });
  }

  async update(id: number, updateEvaluationFieldDto: UpdateEvaluationFieldDto) {
    const ef = await this.findOneBy('id', id);
    Object.assign(ef, updateEvaluationFieldDto);
    return await this.repository.save(ef);
  }

  async remove(id: number) {
    const item = await this.findOneBy('id', id);
    return await this.repository.softRemove(item);
  }
}
