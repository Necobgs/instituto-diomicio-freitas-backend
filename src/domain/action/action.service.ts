import { Injectable, NotFoundException } from '@nestjs/common';
import { ActionRepository } from './action.repository';
import { FilterDto } from '../shared/filter/filter-dto';
import { Action } from './entities/action.entity';

@Injectable()
export class ActionService {

  constructor(private readonly repository: ActionRepository) { }

  async findAll(dto: FilterDto) {
    return await this.repository.filterAll(dto);
  }

  async findOneBy<T extends keyof Action>(key: T, value: Action[T]) {
    const action = await this.repository.findOneBy({ [key]: value });
    if (!action) {
      throw new NotFoundException(`Action com ${key} ${value} não encontrado`);
    }
    return action;
  }

}
