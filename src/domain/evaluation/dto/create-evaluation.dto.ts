import { IsString } from 'class-validator';

export class CreateEvaluationDto {
	@IsString()
	title!: string;
}
