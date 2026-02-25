import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../shared/filter/base-repository';
import { Monitoring } from './entities/monitoring.entity';

@Injectable()
export class MonitoringRepository extends BaseRepository<Monitoring> {
  constructor(dataSource: DataSource) {
    super(Monitoring, dataSource);
  }
}
