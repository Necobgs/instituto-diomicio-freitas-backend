import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EvaluationFieldTypeService } from './evaluation_field_type.service';
import { CreateEvaluationFieldTypeDto } from './dto/create-evaluation_field_type.dto';
import { UpdateEvaluationFieldTypeDto } from './dto/update-evaluation_field_type.dto';

@Controller('evaluation-field-type')
export class EvaluationFieldTypeController {
  constructor(private readonly evaluationFieldTypeService: EvaluationFieldTypeService) {}

  @Post()
  create(@Body() createEvaluationFieldTypeDto: CreateEvaluationFieldTypeDto) {
    return this.evaluationFieldTypeService.create(createEvaluationFieldTypeDto);
  }

  @Get()
  findAll() {
    return this.evaluationFieldTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.evaluationFieldTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEvaluationFieldTypeDto: UpdateEvaluationFieldTypeDto) {
    return this.evaluationFieldTypeService.update(+id, updateEvaluationFieldTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.evaluationFieldTypeService.remove(+id);
  }
}
