import { Controller, Get, Param, Query } from '@nestjs/common';
import { ActionService } from './action.service';
import { Filter } from '../shared/filter/apply-filters';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';


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
  findAll(@Query('filter') dto: Filter) {
    return this.actionService.findAll(dto);
  }
}
