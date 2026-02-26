import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEvaluationFieldTypeDto } from './dto/create-evaluation_field_type.dto';
import { UpdateEvaluationFieldTypeDto } from './dto/update-evaluation_field_type.dto';
import { FilterDto } from '../shared/filter/filter-dto';
import { EvaluationFieldTypeRepository } from './evaluation_field_type.repository';
import { EvaluationFieldType } from './entities/evaluation_field_type.entity';

@Injectable()
export class EvaluationFieldTypeService {
  constructor(
    private readonly repository: EvaluationFieldTypeRepository,
  ) {}

  async create(createEvaluationFieldTypeDto: CreateEvaluationFieldTypeDto) {
    const et = this.repository.create(createEvaluationFieldTypeDto as any);
    return await this.repository.save(et);
  }

  async findAll(dto: FilterDto) {
    return await this.repository.filterAll(dto);
  }

  async findOneBy<T extends keyof EvaluationFieldType>(key: T, value: EvaluationFieldType[T]) {
    const item = await this.repository.findOneBy({ [key]: value });
    if (!item) throw new NotFoundException(`Tipo de campo de avaliação com ${key} ${value} não encontrado`);
    return item;
  }

  async existsBy<T extends keyof EvaluationFieldType>(key: T, value: EvaluationFieldType[T],withDeleted:boolean=true) {
    return await this.repository.exists({
      where:{ 
        [key]: value
      },
      withDeleted
    });
  }

  async update(id: number, updateEvaluationFieldTypeDto: UpdateEvaluationFieldTypeDto) {
    const et = await this.findOneBy('id', id);
    Object.assign(et, updateEvaluationFieldTypeDto);
    return await this.repository.save(et);
  }

  async remove(id: number) {
    const item = await this.findOneBy('id', id);
    return await this.repository.softRemove(item);
  }
}
