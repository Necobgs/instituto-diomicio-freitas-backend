import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../shared/filter/base-repository';
import { Evaluation } from './entities/evaluation.entity';

@Injectable()
export class EvaluationRepository extends BaseRepository<Evaluation> {
  constructor(dataSource: DataSource) {
    super(Evaluation, dataSource);
  }
}
