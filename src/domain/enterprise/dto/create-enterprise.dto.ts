import { IsString, IsBoolean, IsOptional, Length, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateEnterpriseDto {
	@ApiProperty({ example: 'Acme Ltda' })
	@IsNotEmpty()
	@IsString()
	@Transform(({ value }) => value.toUpperCase().trim())
	name!: string;

	@ApiProperty({ example: '12345678000199' })
	@IsNotEmpty()
	@IsString()
	@Transform(({ value }) => value.trim())
	@Length(14, 18)
	cnpj!: string;

	@ApiProperty({ example: '+551130000000' })
	@Transform(({ value }) => value.trim())
	@IsNotEmpty()
	@IsString()
	phone!: string;
}
