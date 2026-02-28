import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { EvaluationQuestionService } from './evaluation_question.service';
import { CreateEvaluationQuestionDto } from './dto/create-evaluation_question.dto';
import { UpdateEvaluationQuestionDto } from './dto/update-evaluation_question.dto';
import { FilterDto } from '../shared/filter/filter-dto';

@ApiTags('evaluation-question')
@ApiBearerAuth('access-token')
@Controller('evaluation-question')
export class EvaluationQuestionController {
  constructor(private readonly evaluationQuestionService: EvaluationQuestionService) { }

  @ApiOperation({ summary: 'Create a new evaluation question' })
  @Post()
  create(@Body() createEvaluationQuestionDto: CreateEvaluationQuestionDto) {
    return this.evaluationQuestionService.create(createEvaluationQuestionDto);
  }

  @ApiOperation({ summary: 'List all evaluation questions' })
  @Get()
  @ApiQuery({ type: FilterDto })
  findAll(@Query() dto: FilterDto) {
    return this.evaluationQuestionService.findAll(dto);
  }

  @ApiOperation({ summary: 'Get evaluation question by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.evaluationQuestionService.findOneBy('id', +id);
  }

  @ApiOperation({ summary: 'Update evaluation question by ID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEvaluationQuestionDto: UpdateEvaluationQuestionDto) {
    return this.evaluationQuestionService.update(+id, updateEvaluationQuestionDto);
  }

  @ApiOperation({ summary: 'Delete evaluation question by ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.evaluationQuestionService.remove(+id);
  }
}
