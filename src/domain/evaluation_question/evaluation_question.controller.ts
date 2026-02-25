import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EvaluationQuestionService } from './evaluation_question.service';
import { CreateEvaluationQuestionDto } from './dto/create-evaluation_question.dto';
import { UpdateEvaluationQuestionDto } from './dto/update-evaluation_question.dto';
import { FilterDto } from '../shared/filter/filter-dto';

@Controller('evaluation-question')
export class EvaluationQuestionController {
  constructor(private readonly evaluationQuestionService: EvaluationQuestionService) {}

  @Post()
  create(@Body() createEvaluationQuestionDto: CreateEvaluationQuestionDto) {
    return this.evaluationQuestionService.create(createEvaluationQuestionDto);
  }

  @Get()
  findAll(@Query() dto: FilterDto) {
    return this.evaluationQuestionService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.evaluationQuestionService.findOneBy('id', +id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEvaluationQuestionDto: UpdateEvaluationQuestionDto) {
    return this.evaluationQuestionService.update(+id, updateEvaluationQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.evaluationQuestionService.remove(+id);
  }
}
