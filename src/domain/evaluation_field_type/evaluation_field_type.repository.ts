import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../shared/filter/base-repository';
import { EvaluationFieldType } from './entities/evaluation_field_type.entity';

@Injectable()
export class EvaluationFieldTypeRepository extends BaseRepository<EvaluationFieldType> {
  constructor(dataSource: DataSource) {
    super(EvaluationFieldType, dataSource);
  }
}
