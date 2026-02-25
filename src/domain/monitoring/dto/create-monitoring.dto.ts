import { IsString, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMonitoringDto {
	@IsString()
	@IsOptional()
	notes?: string;

	@IsNumber()
	@Type(() => Number)
	studentId!: number;

	@IsNumber()
	@Type(() => Number)
	evaluationId!: number;
}
