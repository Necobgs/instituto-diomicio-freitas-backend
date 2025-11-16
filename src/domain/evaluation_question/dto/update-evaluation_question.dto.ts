import { PartialType } from '@nestjs/mapped-types';
import { CreateEvaluationQuestionDto } from './create-evaluation_question.dto';

export class UpdateEvaluationQuestionDto extends PartialType(CreateEvaluationQuestionDto) {}
