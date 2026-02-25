import { IsString, IsDateString, IsBoolean, IsOptional, Length, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateStudentDto {
	@IsString()
	name!: string;

	@IsString()
	phone!: string;

	@IsDateString()
	date_birthday!: string;

	@IsString()
	@Length(11, 15)
	cpf!: string;

	@IsBoolean()
	@IsOptional()
	enabled?: boolean;

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	enterpriseId?: number;
}
