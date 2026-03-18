import { Controller, Get, Param, Query } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { FilterDto } from '../shared/filter/filter-dto';

@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) { }

  @Get()
  findAll(@Query() dto: FilterDto) {
    return this.resourceService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resourceService.findOneBy('id', +id);
  }

}
