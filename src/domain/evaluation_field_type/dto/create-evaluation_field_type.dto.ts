import { IsString, IsOptional } from 'class-validator';

export class CreateEvaluationFieldTypeDto {
	@IsString()
	@IsOptional()
	description?: string;
}
