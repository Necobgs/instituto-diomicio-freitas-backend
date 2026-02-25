import { IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEvaluationFieldDto {
	@IsString()
	label!: string;

	@IsNumber()
	@Type(() => Number)
	questionId!: number;

	@IsNumber()
	@Type(() => Number)
	typeId!: number;
}
