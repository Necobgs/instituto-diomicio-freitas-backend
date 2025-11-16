import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EvaluationQuestionService } from './evaluation_question.service';
import { CreateEvaluationQuestionDto } from './dto/create-evaluation_question.dto';
import { UpdateEvaluationQuestionDto } from './dto/update-evaluation_question.dto';

@Controller('evaluation-question')
export class EvaluationQuestionController {
  constructor(private readonly evaluationQuestionService: EvaluationQuestionService) {}

  @Post()
  create(@Body() createEvaluationQuestionDto: CreateEvaluationQuestionDto) {
    return this.evaluationQuestionService.create(createEvaluationQuestionDto);
  }

  @Get()
  findAll() {
    return this.evaluationQuestionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.evaluationQuestionService.findOne(+id);
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
