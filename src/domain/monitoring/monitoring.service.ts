import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMonitoringDto } from './dto/create-monitoring.dto';
import { UpdateMonitoringDto } from './dto/update-monitoring.dto';
import { FilterDto } from '../shared/filter/filter-dto';
import { MonitoringRepository } from './monitoring.repository';
import { Monitoring } from './entities/monitoring.entity';
import { Student } from '../student/entities/student.entity';

@Injectable()
export class MonitoringService {
  constructor(
    private readonly repository: MonitoringRepository,
  ) { }

  async create(createMonitoringDto: CreateMonitoringDto) {
    const monitoring = this.repository.create(createMonitoringDto);
    const student = await this.repository.manager.findOneBy(Student, { id: createMonitoringDto.studentId });
    if (!student) throw new NotFoundException(`Estudante com id ${createMonitoringDto.studentId} não encontrado`);

    monitoring.student = student;
    return await this.repository.save(monitoring);
  }

  async findAll(dto: FilterDto) {

    const qb = this.repository.getFilteredQueryBuilder(dto).setFindOptions({
      relations: ['student'],
      select: {
        id: true,
        deleted_at: true,
        observations: true,
        visitDate: true,
        student: {
          id: true,
          name: true
        }
      }
    });
    return await this.repository.returnFilterAll(dto, qb);
  }

  async findOneBy<T extends keyof Monitoring>(key: T, value: Monitoring[T]) {
    const item = await this.repository.findOne({ where: { [key]: value }, relations: ['student', 'student.enterprise'], withDeleted: true });
    if (!item) throw new NotFoundException(`Monitoramento com ${key} ${value} não encontrado`);
    return item;
  }

  async existsBy<T extends keyof Monitoring>(key: T, value: Monitoring[T], withDeleted: boolean = true) {
    return await this.repository.exists({
      where: {
        [key]: value
      },
      withDeleted
    });
  }

  async update(id: number, updateMonitoringDto: UpdateMonitoringDto) {
    const monitoring = await this.repository.preload({ id, ...updateMonitoringDto });

    if (!monitoring) throw new NotFoundException(`Monitoramento com id ${id} não encontrado`);

    if (updateMonitoringDto.studentId) {
      const student = await this.repository.manager.findOneBy(Student, { id: updateMonitoringDto.studentId });
      if (!student) throw new NotFoundException(`Estudante com id ${updateMonitoringDto.studentId} não encontrado`);
      monitoring.student = student;
    }

    return await this.repository.save(monitoring);
  }

  async remove(id: number) {
    const item = await this.findOneBy('id', id);
    return await this.repository.softRemove(item);
  }
}
