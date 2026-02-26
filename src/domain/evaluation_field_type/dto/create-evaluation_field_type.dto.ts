import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEvaluationFieldTypeDto {
	@ApiPropertyOptional({ example: 'Text input' })
	@IsString()
	@IsOptional()
	description?: string;
}
