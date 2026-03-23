import { Controller, Get, Param, Query } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Filter } from '../shared/filter/apply-filters';

@ApiTags('resourcers')
@ApiBearerAuth('access-token')
@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) { }

  @Get()
  findAll(@Query() dto: Filter) {
    return this.resourceService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resourceService.findOneBy('id', +id);
  }

}
