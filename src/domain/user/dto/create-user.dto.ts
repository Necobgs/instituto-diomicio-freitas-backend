import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateUserDto {

	@ApiProperty({ example: 'john_doe' })
	@IsString()
	@MinLength(3)
	@Transform(({ value }) => value.toUpperCase())
	username!: string;

}
