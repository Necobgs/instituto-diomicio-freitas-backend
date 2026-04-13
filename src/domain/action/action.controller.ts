import { Controller, Get, Param, Query } from '@nestjs/common';
import { ActionService } from './action.service';
import { Filter } from '../shared/filter/apply-filters';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Authorization } from '../shared/authorization/authorization.decorator';
import { Resources } from '../../consts/resources';
import { Actions } from '../../consts/actions';


@ApiTags('Actions')
@ApiBearerAuth("access-token")
@Controller('action')
export class ActionController {
  constructor(private readonly actionService: ActionService) { }

  @Get()
  @ApiQuery({
    name: 'filter',
    type: 'string',
    required: false,
    description: 'Filtro para ações'
  })
  @Authorization({ resource: Resources.action, actions: [Actions.read] })
  findAll(@Query('filter') dto: Filter) {
    return this.actionService.findAll(dto);
  }
}
