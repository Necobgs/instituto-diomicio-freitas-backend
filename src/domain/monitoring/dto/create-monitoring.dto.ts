import { IsString, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMonitoringDto {
	@ApiPropertyOptional({ example: 'Estudante demonstra melhorias na comunicação' })
	@IsString()
	@IsOptional()
	notes?: string;

	@ApiProperty({ example: 5 })
	@IsNumber()
	@Type(() => Number)
	studentId!: number;

	@ApiProperty({ example: 2 })
	@IsNumber()
	@Type(() => Number)
	evaluationId!: number;
}
