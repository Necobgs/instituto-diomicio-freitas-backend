import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from "class-transformer";

export class SignInDto {

    @ApiProperty({ example: 'john_doe_email@email.com' })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @Transform(({ value }) => value.toLowerCase())
    email!: string;

    @ApiProperty({ example: 'P@ssword123' })
    @IsNotEmpty()
    @IsString()
    password!: string;

}