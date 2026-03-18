import { Controller, Get, Param, Query } from '@nestjs/common';
import { ActionService } from './action.service';
import { FilterDto } from '../shared/filter/filter-dto';

@Controller('action')
export class ActionController {
  constructor(private readonly actionService: ActionService) { }

  @Get()
  findAll(@Query() dto: FilterDto) {
    return this.actionService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actionService.findOneBy('id', +id);
  }

}
