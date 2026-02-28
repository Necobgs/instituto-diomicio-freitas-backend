import { PartialType } from '@nestjs/swagger';
import { CreateEvaluationQuestionDto } from './create-evaluation_question.dto';

export class UpdateEvaluationQuestionDto extends PartialType(CreateEvaluationQuestionDto) { }
