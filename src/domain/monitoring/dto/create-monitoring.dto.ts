import { IsString, IsOptional, IsNumber, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMonitoringDto {
	@ApiPropertyOptional({ example: 'Estudante demonstra melhorias na comunicação' })
	@IsString()
	@IsOptional()
	observations?: string;

	@ApiProperty({ example: '2023-10-25' })
	@IsDateString()
	visitDate!: Date;

	@ApiProperty({ example: 5 })
	@IsNumber()
	@Type(() => Number)
	studentId!: number;

	@ApiProperty({ example: 2 })
	@IsNumber()
	@Type(() => Number)
	enterpriseId!: number;
}
