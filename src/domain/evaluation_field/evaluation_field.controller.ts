import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { EvaluationFieldService } from './evaluation_field.service';
import { CreateEvaluationFieldDto } from './dto/create-evaluation_field.dto';
import { UpdateEvaluationFieldDto } from './dto/update-evaluation_field.dto';
import { FilterDto } from '../shared/filter/filter-dto';

@ApiTags('evaluation-field')
@ApiBearerAuth('access-token')
@Controller('evaluation-field')
export class EvaluationFieldController {
  constructor(private readonly evaluationFieldService: EvaluationFieldService) {}

  @ApiOperation({ summary: 'Create a new evaluation field' })
  @Post()
  create(@Body() createEvaluationFieldDto: CreateEvaluationFieldDto) {
    return this.evaluationFieldService.create(createEvaluationFieldDto);
  }

  @ApiOperation({ summary: 'List all evaluation fields' })
  @Get()
  findAll(@Query() dto: FilterDto) {
    return this.evaluationFieldService.findAll(dto);
  }

  @ApiOperation({ summary: 'Get evaluation field by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.evaluationFieldService.findOneBy('id', +id);
  }

  @ApiOperation({ summary: 'Update evaluation field by ID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEvaluationFieldDto: UpdateEvaluationFieldDto) {
    return this.evaluationFieldService.update(+id, updateEvaluationFieldDto);
  }

  @ApiOperation({ summary: 'Delete evaluation field by ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.evaluationFieldService.remove(+id);
  }
}
