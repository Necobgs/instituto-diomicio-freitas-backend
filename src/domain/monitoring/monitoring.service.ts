import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMonitoringDto } from './dto/create-monitoring.dto';
import { UpdateMonitoringDto } from './dto/update-monitoring.dto';
import { FilterDto } from '../shared/filter/filter-dto';
import { MonitoringRepository } from './monitoring.repository';
import { Monitoring } from './entities/monitoring.entity';

@Injectable()
export class MonitoringService {
  constructor(
    private readonly repository: MonitoringRepository,
  ) {}

  async create(createMonitoringDto: CreateMonitoringDto) {
    const m = this.repository.create(createMonitoringDto as any);
    return await this.repository.save(m);
  }

  async findAll(dto: FilterDto) {
    return await this.repository.filterAll(dto);
  }

  async findOneBy<T extends keyof Monitoring>(key: T, value: Monitoring[T]) {
    const item = await this.repository.findOneBy({ [key]: value });
    if (!item) throw new NotFoundException(`Monitoramento com ${key} ${value} não encontrado`);
    return item;
  }

  async existsBy<T extends keyof Monitoring>(key: T, value: Monitoring[T],withDeleted:boolean=true) {
    return await this.repository.exists({
      where:{
        [key]: value
      },
      withDeleted
    });
  }

  async update(id: number, updateMonitoringDto: UpdateMonitoringDto) {
    const m = await this.findOneBy('id', id);
    Object.assign(m, updateMonitoringDto);
    return await this.repository.save(m);
  }

  async remove(id: number) {
    const item = await this.findOneBy('id', id);
    return await this.repository.softRemove(item);
  }
}
