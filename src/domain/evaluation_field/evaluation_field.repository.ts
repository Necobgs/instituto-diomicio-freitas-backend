import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../shared/filter/base-repository';
import { EvaluationField } from './entities/evaluation_field.entity';

@Injectable()
export class EvaluationFieldRepository extends BaseRepository<EvaluationField> {
  constructor(dataSource: DataSource) {
    super(EvaluationField, dataSource);
  }
}
