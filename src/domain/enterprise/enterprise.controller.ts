import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { EnterpriseService } from './enterprise.service';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
import { FilterDto } from '../shared/filter/filter-dto';

@ApiTags('enterprise')
@ApiBearerAuth('access-token')
@Controller('enterprise')
export class EnterpriseController {
  constructor(private readonly enterpriseService: EnterpriseService) {}

  @ApiOperation({ summary: 'Create a new enterprise' })
  @Post()
  create(@Body() createEnterpriseDto: CreateEnterpriseDto) {
    return this.enterpriseService.create(createEnterpriseDto);
  }

  @ApiOperation({ summary: 'List all enterprises' })
  @Get()
  findAll(@Query() dto: FilterDto) {
    return this.enterpriseService.findAll(dto);
  }

  @ApiOperation({ summary: 'Get enterprise by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enterpriseService.findOneBy('id', +id);
  }

  @ApiOperation({ summary: 'Update enterprise by ID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEnterpriseDto: UpdateEnterpriseDto) {
    return this.enterpriseService.update(+id, updateEnterpriseDto);
  }

  @ApiOperation({ summary: 'Delete enterprise by ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enterpriseService.remove(+id);
  }
}
