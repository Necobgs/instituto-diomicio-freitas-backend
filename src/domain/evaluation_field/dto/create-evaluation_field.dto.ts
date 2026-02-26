import { IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEvaluationFieldDto {
	@ApiProperty({ example: 'Nível de comunicação' })
	@IsString()
	label!: string;

	@ApiProperty({ example: 1 })
	@IsNumber()
	@Type(() => Number)
	questionId!: number;

	@ApiProperty({ example: 2 })
	@IsNumber()
	@Type(() => Number)
	typeId!: number;
}
