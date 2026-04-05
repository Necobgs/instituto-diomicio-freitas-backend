import { ArrayUnique, IsArray, IsEmail, IsNumber, IsPositive, IsString, Length, MinLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateUserDto {

	@ApiProperty({ example: 'john_doe' })
	@IsNotEmpty()
	@IsString()
	@MinLength(3)
	@Transform(({ value }) => value.toUpperCase())
	username!: string;

	@ApiProperty({ example: 'john_doe_email@email.com' })
	@Transform(({ value }) => value.toLowerCase())
	@IsNotEmpty()
	@IsString()
	@IsEmail()
	email!: string;

	@ApiProperty({ example: '12345678901' })
	@IsNotEmpty()
	@IsString()
	@Length(11, 15)
	cpf!: string;

	@ApiProperty({ example: [1, 2, 3] })
	@IsNotEmpty()
	@IsArray()
	@IsNumber({}, { each: true })
	@IsPositive({ each: true })
	@ArrayUnique()
	permissionsId!: number[];

}
