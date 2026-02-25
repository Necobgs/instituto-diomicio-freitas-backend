import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../shared/filter/base-repository';
import { Enterprise } from './entities/enterprise.entity';

@Injectable()
export class EnterpriseRepository extends BaseRepository<Enterprise> {
  constructor(dataSource: DataSource) {
    super(Enterprise, dataSource);
  }
}
