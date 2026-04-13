import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { EvaluationService } from './evaluation.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { FilterDto } from '../shared/filter/filter-dto';
import { Authorization } from '../shared/authorization/authorization.decorator';
import { Resources } from '../../consts/resources';
import { Actions } from '../../consts/actions';

@ApiTags('evaluation')
@ApiBearerAuth('access-token')
@Controller('evaluation')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) { }

  @ApiOperation({ summary: 'Create a new evaluation' })
  @Post()
  @Authorization({ resource: Resources.evaluation, actions: [Actions.create] })
  create(@Body() createEvaluationDto: CreateEvaluationDto) {
    return this.evaluationService.create(createEvaluationDto);
  }

  @ApiOperation({ summary: 'List all evaluations' })
  @Get()
  @Authorization({ resource: Resources.evaluation, actions: [Actions.read] })
  findAll(@Query() dto: FilterDto) {
    return this.evaluationService.findAll(dto);
  }

  @ApiOperation({ summary: 'Get evaluation by ID' })
  @Get(':id')
  @Authorization({ resource: Resources.evaluation, actions: [Actions.read] })
  findOneById(@Param('id') id: string) {
    return this.evaluationService.findOneById(+id);
  }

  @ApiOperation({ summary: 'Update evaluation by ID' })
  @Patch(':id')
  @Authorization({ resource: Resources.evaluation, actions: [Actions.update] })
  update(@Param('id') id: string, @Body() updateEvaluationDto: UpdateEvaluationDto) {
    return this.evaluationService.update(+id, updateEvaluationDto);
  }

  @ApiOperation({ summary: 'Delete evaluation by ID' })
  @Delete(':id')
  @Authorization({ resource: Resources.evaluation, actions: [Actions.delete] })
  remove(@Param('id') id: string) {
    return this.evaluationService.remove(+id);
  }
}
