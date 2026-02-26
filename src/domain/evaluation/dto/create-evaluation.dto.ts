import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEvaluationDto {
	@ApiProperty({ example: 'Initial Assessment' })
	@IsString()
	title!: string;
}
