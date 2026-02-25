import { IsString, IsBoolean, IsOptional, Length } from 'class-validator';

export class CreateEnterpriseDto {
	@IsString()
	name!: string;

	@IsString()
	@Length(14, 18)
	cnpj!: string;

	@IsString()
	phone!: string;

	@IsBoolean()
	@IsOptional()
	enabled?: boolean;
}
