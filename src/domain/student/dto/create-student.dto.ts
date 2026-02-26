import { IsString, IsDateString, IsBoolean, IsOptional, Length, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateStudentDto {
	@ApiProperty({ example: 'Jane Doe' })
	@IsString()
	name!: string;

	@ApiProperty({ example: '+5511999998888' })
	@IsString()
	phone!: string;

	@ApiProperty({ example: '2000-01-01' })
	@IsDateString()
	date_birthday!: string;

	@ApiProperty({ example: '12345678901' })
	@IsString()
	@Length(11, 15)
	cpf!: string;

	@ApiPropertyOptional({ example: 1 })
	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	enterpriseId?: number;
}
