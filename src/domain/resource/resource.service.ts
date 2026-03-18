import { Injectable, NotFoundException } from '@nestjs/common';
import { ResourceRepository } from './resource.repository';
import { FilterDto } from '../shared/filter/filter-dto';
import { Resource } from './entities/resource.entity';

@Injectable()
export class ResourceService {

  constructor(private readonly repository: ResourceRepository) { }

  async findAll(dto: FilterDto) {
    return await this.repository.filterAll(dto);
  }

  async findOneBy<T extends keyof Resource>(key: T, value: Resource[T]) {
    const resource = await this.repository.findOneBy({ [key]: value });
    if (!resource) {
      throw new NotFoundException(`Resource com ${key} ${value} não encontrado`);
    }
    return resource;
  }

}
