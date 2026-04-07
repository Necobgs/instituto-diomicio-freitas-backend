import { BadRequestException, Injectable } from '@nestjs/common';
import { FilterDto } from '../shared/filter/filter-dto';
import { PermissionRepository } from './permission.repository';
import { Filter } from '../shared/filter/apply-filters';

@Injectable()
export class PermissionService {

  constructor(private readonly permissionRepository: PermissionRepository) { }

  async exists(filter: Filter) {
    return await this.permissionRepository.filterExists(filter);
  }

  async findAll(filter: FilterDto) {
    const qb = this.permissionRepository.getFilteredQueryBuilder(filter)
      .leftJoin('entity.resource', 'resource')
      .leftJoin('entity.action', 'action')
      .select(['entity.id', 'resource.name', 'action.name']);
    return await this.permissionRepository.returnFilterAll(filter, qb);
  }

  async findOne(id: number) {
    const permission = await this.permissionRepository.createQueryBuilder('entity')
      .withDeleted()
      .leftJoin('entity.resource', 'resource')
      .leftJoin('entity.action', 'action')
      .select(['entity.id', 'resource.name', 'action.name'])
      .where('entity.id = :id', { id })
      .getOne();
    if (!permission) throw new BadRequestException(`Permissão de id '${id}' não encontrado`)
    return permission;
  }
}