import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { MonitoringService } from './monitoring.service';
import { CreateMonitoringDto } from './dto/create-monitoring.dto';
import { UpdateMonitoringDto } from './dto/update-monitoring.dto';
import { FilterDto } from '../shared/filter/filter-dto';
import { Authorization } from '../shared/authorization/authorization.decorator';
import { Resources } from '../../consts/resources';
import { Actions } from '../../consts/actions';

@ApiTags('monitoring')
@ApiBearerAuth('access-token')
@Controller('monitoring')
export class MonitoringController {
  constructor(private readonly monitoringService: MonitoringService) { }

  @ApiOperation({ summary: 'Create a new monitoring record' })
  @Post()
  @Authorization({ resource: Resources.monitoring, actions: [Actions.create] })
  create(@Body() createMonitoringDto: CreateMonitoringDto) {
    return this.monitoringService.create(createMonitoringDto);
  }

  @ApiOperation({ summary: 'List all monitoring records' })
  @Get()
  @Authorization({ resource: Resources.monitoring, actions: [Actions.read] })
  findAll(@Query() dto: FilterDto) {
    return this.monitoringService.findAll(dto);
  }

  @ApiOperation({ summary: 'Get monitoring record by ID' })
  @Get(':id')
  @Authorization({ resource: Resources.monitoring, actions: [Actions.read] })
  findOne(@Param('id') id: string) {
    return this.monitoringService.findOneBy('id', +id);
  }

  @ApiOperation({ summary: 'Update monitoring record by ID' })
  @Patch(':id')
  @Authorization({ resource: Resources.monitoring, actions: [Actions.update] })
  update(@Param('id') id: string, @Body() updateMonitoringDto: UpdateMonitoringDto) {
    return this.monitoringService.update(+id, updateMonitoringDto);
  }

  @ApiOperation({ summary: 'Delete monitoring record by ID' })
  @Delete(':id')
  @Authorization({ resource: Resources.monitoring, actions: [Actions.delete] })
  remove(@Param('id') id: string) {
    return this.monitoringService.remove(+id);
  }
}
