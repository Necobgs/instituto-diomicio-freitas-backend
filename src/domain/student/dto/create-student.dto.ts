import { IsString, IsDateString, IsBoolean, IsOptional, Length, IsNumber, IsPositive, MaxDate, IsDate } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateStudentDto {
	@ApiProperty({ example: 'Jane Doe' })
	@IsString()
	@Transform(({ value }) => value.trim().toUpperCase())
	name!: string;

	@ApiProperty({ example: '+5511999998888' })
	@IsString()
	@Transform(({ value }) => value.trim())
	phone!: string;

	@ApiProperty({ example: '2000-01-01' })
	@Type(() => Date)
	@IsDate()
	@MaxDate(new Date())
	date_birthday!: Date;

	@ApiProperty({ example: '12345678901' })
	@IsString()
	@Transform(({ value }) => value.trim())
	@Length(11, 15)
	cpf!: string;

	@ApiPropertyOptional({ example: 1 })
	@IsOptional()
	@IsNumber()
	@IsPositive()
	@Type(() => Number)
	enterpriseId?: number;
}
