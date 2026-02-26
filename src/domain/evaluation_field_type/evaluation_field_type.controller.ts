import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { EvaluationFieldTypeService } from './evaluation_field_type.service';
import { CreateEvaluationFieldTypeDto } from './dto/create-evaluation_field_type.dto';
import { UpdateEvaluationFieldTypeDto } from './dto/update-evaluation_field_type.dto';
import { FilterDto } from '../shared/filter/filter-dto';

@ApiTags('evaluation-field-type')
@ApiBearerAuth('access-token')
@Controller('evaluation-field-type')
export class EvaluationFieldTypeController {
  constructor(private readonly evaluationFieldTypeService: EvaluationFieldTypeService) {}

  @ApiOperation({ summary: 'Create a new evaluation field type' })
  @Post()
  create(@Body() createEvaluationFieldTypeDto: CreateEvaluationFieldTypeDto) {
    return this.evaluationFieldTypeService.create(createEvaluationFieldTypeDto);
  }

  @ApiOperation({ summary: 'List all evaluation field types' })
  @Get()
  findAll(@Query() dto: FilterDto) {
    return this.evaluationFieldTypeService.findAll(dto);
  }

  @ApiOperation({ summary: 'Get evaluation field type by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.evaluationFieldTypeService.findOneBy('id', +id);
  }

  @ApiOperation({ summary: 'Update evaluation field type by ID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEvaluationFieldTypeDto: UpdateEvaluationFieldTypeDto) {
    return this.evaluationFieldTypeService.update(+id, updateEvaluationFieldTypeDto);
  }

  @ApiOperation({ summary: 'Delete evaluation field type by ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.evaluationFieldTypeService.remove(+id);
  }
}
