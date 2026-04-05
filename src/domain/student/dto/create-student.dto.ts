import { IsString, IsDateString, IsBoolean, IsOptional, Length, IsNumber, IsPositive, MaxDate, IsDate, IsNotEmpty } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateStudentDto {
	@ApiProperty({ example: 'Jane Doe' })
	@IsNotEmpty()
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
	@IsNotEmpty()
	date_birthday!: Date;

	@ApiProperty({ example: '12345678901' })
	@IsNotEmpty()
	@IsString()
	@Transform(({ value }) => value.trim())
	@Length(11, 15)
	cpf!: string;

	@ApiProperty({ example: 'John Doe' })
	@IsOptional()
	@IsString()
	@Transform(({ value }) => value?.trim().toUpperCase())
	responsibleName!: string;

	@ApiProperty({ example: '+5511999998888' })
	@IsOptional()
	@IsString()
	@Transform(({ value }) => value?.trim())
	responsiblePhone!: string;

	@ApiProperty({ example: true })
	@IsNotEmpty()
	@IsBoolean()
	@Transform(({ value }) => value === 'true' || value === true)
	useMedicine!: boolean;

	@ApiProperty({ example: 'Uses medication' })
	@IsString()
	@IsOptional()
	@Transform(({ value }) => value?.trim().toUpperCase())
	infoMedicine: string;

	@ApiProperty({ example: '2022-01-01T00:00:00.000Z' })
	@Type(() => Date)
	@IsDate()
	dateEntry!: Date;
}
