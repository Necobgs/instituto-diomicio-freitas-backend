import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { EvaluationService } from './evaluation.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { FilterDto } from '../shared/filter/filter-dto';

@ApiTags('evaluation')
@ApiBearerAuth('access-token')
@Controller('evaluation')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @ApiOperation({ summary: 'Create a new evaluation' })
  @Post()
  create(@Body() createEvaluationDto: CreateEvaluationDto) {
    return this.evaluationService.create(createEvaluationDto);
  }

  @ApiOperation({ summary: 'List all evaluations' })
  @Get()
  findAll(@Query() dto: FilterDto) {
    return this.evaluationService.findAll(dto);
  }

  @ApiOperation({ summary: 'Get evaluation by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.evaluationService.findOneBy('id', +id);
  }

  @ApiOperation({ summary: 'Update evaluation by ID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEvaluationDto: UpdateEvaluationDto) {
    return this.evaluationService.update(+id, updateEvaluationDto);
  }

  @ApiOperation({ summary: 'Delete evaluation by ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.evaluationService.remove(+id);
  }
}
