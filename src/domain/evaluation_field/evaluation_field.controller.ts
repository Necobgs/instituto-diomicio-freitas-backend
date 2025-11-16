import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EvaluationFieldService } from './evaluation_field.service';
import { CreateEvaluationFieldDto } from './dto/create-evaluation_field.dto';
import { UpdateEvaluationFieldDto } from './dto/update-evaluation_field.dto';

@Controller('evaluation-field')
export class EvaluationFieldController {
  constructor(private readonly evaluationFieldService: EvaluationFieldService) {}

  @Post()
  create(@Body() createEvaluationFieldDto: CreateEvaluationFieldDto) {
    return this.evaluationFieldService.create(createEvaluationFieldDto);
  }

  @Get()
  findAll() {
    return this.evaluationFieldService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.evaluationFieldService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEvaluationFieldDto: UpdateEvaluationFieldDto) {
    return this.evaluationFieldService.update(+id, updateEvaluationFieldDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.evaluationFieldService.remove(+id);
  }
}
