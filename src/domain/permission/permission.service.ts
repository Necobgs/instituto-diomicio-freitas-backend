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
    return await this.permissionRepository.filterAll(filter);
  }

  async findOne(id: number) {
    const permission = await this.permissionRepository.findOneBy({ id });
    if (!permission) throw new BadRequestException(`Permissão de id '${id}' não encontrado`)
    return permission;
  }
}