import { Controller, Get, Param, Query } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Filter } from '../shared/filter/apply-filters';
import { Authorization } from '../shared/authorization/authorization.decorator';
import { Resources } from '../../consts/resources';
import { Actions } from '../../consts/actions';
@ApiTags('resourcers')
@ApiBearerAuth('access-token')
@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) { }

  @Get()
  @Authorization({ resource: Resources.resource, actions: [Actions.read] })
  findAll(@Query() dto: Filter) {
    return this.resourceService.findAll(dto);
  }

  @Get(':id')
  @Authorization({ resource: Resources.resource, actions: [Actions.read] })
  findOne(@Param('id') id: string) {
    return this.resourceService.findOneBy('id', +id);
  }

}
