import { IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEvaluationQuestionDto {
	@IsString()
	question!: string;

	@IsNumber()
	@Type(() => Number)
	evaluationId!: number;
}
