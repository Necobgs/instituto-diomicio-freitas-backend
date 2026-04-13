import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { EnterpriseService } from './enterprise.service';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
import { FilterDto } from '../shared/filter/filter-dto';
import { Authorization } from '../shared/authorization/authorization.decorator';
import { Resources } from '../../consts/resources';
import { Actions } from '../../consts/actions';

@ApiTags('enterprise')
@ApiBearerAuth('access-token')
@Controller('enterprise')
export class EnterpriseController {
  constructor(private readonly enterpriseService: EnterpriseService) { }

  @ApiOperation({ summary: 'Create a new enterprise' })
  @Post()
  @Authorization({ resource: Resources.enterprise, actions: [Actions.create] })
  create(@Body() createEnterpriseDto: CreateEnterpriseDto) {
    return this.enterpriseService.create(createEnterpriseDto);
  }

  @ApiOperation({ summary: 'List all enterprises' })
  @Get()
  @Authorization({ resource: Resources.enterprise, actions: [Actions.read] })
  findAll(@Query() dto: FilterDto) {
    return this.enterpriseService.findAll(dto);
  }

  @ApiOperation({ summary: 'Get enterprise by ID' })
  @Get(':id')
  @Authorization({ resource: Resources.enterprise, actions: [Actions.read] })
  findOne(@Param('id') id: string) {
    return this.enterpriseService.findOneBy('id', +id);
  }

  @ApiOperation({ summary: 'Update enterprise by ID' })
  @Patch(':id')
  @Authorization({ resource: Resources.enterprise, actions: [Actions.update] })
  update(@Param('id') id: string, @Body() updateEnterpriseDto: UpdateEnterpriseDto) {
    return this.enterpriseService.update(+id, updateEnterpriseDto);
  }

  @ApiOperation({ summary: 'Delete enterprise by ID' })
  @Delete(':id')
  @Authorization({ resource: Resources.enterprise, actions: [Actions.delete] })
  remove(@Param('id') id: string) {
    return this.enterpriseService.remove(+id);
  }
}
