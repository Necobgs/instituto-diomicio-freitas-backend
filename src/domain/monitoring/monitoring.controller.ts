import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { MonitoringService } from './monitoring.service';
import { CreateMonitoringDto } from './dto/create-monitoring.dto';
import { UpdateMonitoringDto } from './dto/update-monitoring.dto';
import { FilterDto } from '../shared/filter/filter-dto';

@ApiTags('monitoring')
@ApiBearerAuth('access-token')
@Controller('monitoring')
export class MonitoringController {
  constructor(private readonly monitoringService: MonitoringService) { }

  @ApiOperation({ summary: 'Create a new monitoring record' })
  @Post()
  create(@Body() createMonitoringDto: CreateMonitoringDto) {
    return this.monitoringService.create(createMonitoringDto);
  }

  @ApiOperation({ summary: 'List all monitoring records' })
  @Get()
  findAll(@Query() dto: FilterDto) {
    return this.monitoringService.findAll(dto);
  }

  @ApiOperation({ summary: 'Get monitoring record by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.monitoringService.findOneBy('id', +id);
  }

  @ApiOperation({ summary: 'Update monitoring record by ID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMonitoringDto: UpdateMonitoringDto) {
    return this.monitoringService.update(+id, updateMonitoringDto);
  }

  @ApiOperation({ summary: 'Delete monitoring record by ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.monitoringService.remove(+id);
  }
}
