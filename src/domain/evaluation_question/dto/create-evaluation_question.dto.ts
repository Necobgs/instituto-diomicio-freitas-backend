import { IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEvaluationQuestionDto {
	@ApiProperty({ example: 'Quão satisfeito você está com o atendimento?' })
	@IsString()
	question!: string;

	@ApiProperty({ example: 3 })
	@IsNumber()
	@Type(() => Number)
	evaluationId!: number;
}
