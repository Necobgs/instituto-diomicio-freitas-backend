import { IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
	@ApiProperty({ example: 'john_doe' })
	@IsString()
	@MinLength(3)
	username!: string;

	@ApiProperty({ example: 'P@ssword123' })
	@IsString()
	@MinLength(6)
	password!: string;

	@ApiProperty({ example: 'user@example.com' })
	@IsEmail()
	email!: string;
}
