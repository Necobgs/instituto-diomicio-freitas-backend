import { IsString, IsEmail, IsBoolean, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
	@IsString()
	@MinLength(3)
	username!: string;

	@IsString()
	@MinLength(6)
	password!: string;

	@IsEmail()
	email!: string;

	@IsBoolean()
	@IsOptional()
	enabled?: boolean;
}
