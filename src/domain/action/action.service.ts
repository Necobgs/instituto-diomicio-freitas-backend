import { Injectable, NotFoundException } from '@nestjs/common';
import { ActionRepository } from './action.repository';
import { Action } from './entities/action.entity';
import { Filter } from '../shared/filter/apply-filters';

@Injectable()
export class ActionService {

  constructor(private readonly repository: ActionRepository) { }

  async findAll(dto: Filter) {
    return await this.repository.getFilteredQueryBuilder(dto, [], false)
      .select(
        ['entity.id', 'entity.name', 'entity.identifier']
      ).getMany();
  }

  async findOneBy<T extends keyof Action>(key: T, value: Action[T]) {
    const action = await this.repository.findOne({ where: { [key]: value }, withDeleted: true });
    if (!action) {
      throw new NotFoundException(`Action com ${key} ${value} não encontrado`);
    }
    return action;
  }

}
