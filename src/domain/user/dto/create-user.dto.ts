import { IsArray, IsEmail, IsNumber, IsString, Length, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateUserDto {

	@ApiProperty({ example: 'john_doe' })
	@IsString()
	@MinLength(3)
	@Transform(({ value }) => value.toUpperCase())
	username!: string;

	@ApiProperty({ example: 'john_doe_email@email.com' })
	@Transform(({ value }) => value.toLowerCase())
	@IsString()
	@IsEmail()
	email!: string;

	@ApiProperty({ example: '12345678901' })
	@IsString()
	@Length(11, 15)
	cpf!: string;

	@ApiProperty({ example: [1, 2, 3] })
	@IsArray()
	permissionsId!: number[];

}
