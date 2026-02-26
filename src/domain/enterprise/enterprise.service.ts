import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
import { FilterDto } from '../shared/filter/filter-dto';
import { EnterpriseRepository } from './enterprise.repository';
import { Enterprise } from './entities/enterprise.entity';

@Injectable()
export class EnterpriseService {
  constructor(
    private readonly repository: EnterpriseRepository,
  ) {}

  async create(createEnterpriseDto: CreateEnterpriseDto) {
    const ent = this.repository.create(createEnterpriseDto as any);
    return await this.repository.save(ent);
  }

  async findAll(dto: FilterDto) {
    return await this.repository.filterAll(dto);
  }

  async findOneBy<T extends keyof Enterprise>(key: T, value: Enterprise[T]) {
    const item = await this.repository.findOneBy({ [key]: value });
    if (!item) throw new NotFoundException(`Empresa com ${key} ${value} não encontrada`);
    return item;
  }

  async existsBy<T extends keyof Enterprise>(key: T, value: Enterprise[T],withDeleted:boolean=true) {
    return await this.repository.exists({
      where:{ 
        [key]: value
      },
      withDeleted
    });
  }

  async update(id: number, updateEnterpriseDto: UpdateEnterpriseDto) {
    const ent = await this.findOneBy('id', id);
    Object.assign(ent, updateEnterpriseDto);
    return await this.repository.save(ent);
  }

  async remove(id: number) {
    const item = await this.findOneBy('id', id);
    return await this.repository.softRemove(item);
  }
}
