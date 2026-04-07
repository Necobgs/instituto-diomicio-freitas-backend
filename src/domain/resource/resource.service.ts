import { Injectable, NotFoundException } from '@nestjs/common';
import { ResourceRepository } from './resource.repository';
import { Resource } from './entities/resource.entity';
import { Filter } from '../shared/filter/apply-filters';

@Injectable()
export class ResourceService {

  constructor(private readonly repository: ResourceRepository) { }

  async findAll(dto: Filter) {
    return await this.repository
      .getFilteredQueryBuilder(dto, [], false)
      .select(['entity.id', 'entity.name', 'entity.identifier'])
      .getMany();
  }

  async findOneBy<T extends keyof Resource>(key: T, value: Resource[T]) {
    const resource = await this.repository.findOne({ where: { [key]: value }, withDeleted: true });
    if (!resource) {
      throw new NotFoundException(`Resource com ${key} ${value} não encontrado`);
    }
    return resource;
  }

}
