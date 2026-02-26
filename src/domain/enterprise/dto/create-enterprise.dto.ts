import { IsString, IsBoolean, IsOptional, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEnterpriseDto {
	@ApiProperty({ example: 'Acme Ltda' })
	@IsString()
	name!: string;

	@ApiProperty({ example: '12345678000199' })
	@IsString()
	@Length(14, 18)
	cnpj!: string;

	@ApiProperty({ example: '+551130000000' })
	@IsString()
	phone!: string;
}
