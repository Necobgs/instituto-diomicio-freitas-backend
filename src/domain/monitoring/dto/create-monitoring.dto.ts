import { IsString, IsOptional, IsNumber, IsDateString, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMonitoringDto {
	@ApiPropertyOptional({ example: 'Estudante demonstra melhorias na comunicação' })
	@IsString()
	@IsOptional()
	observations?: string;

	@ApiProperty({ example: '2023-10-25' })
	@IsNotEmpty()
	@IsDateString()
	visitDate!: Date;

	@ApiProperty({ example: 5 })
	@IsNotEmpty()
	@IsNumber()
	@Type(() => Number)
	studentId!: number;
}
