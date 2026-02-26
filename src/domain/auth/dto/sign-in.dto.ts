import { IsNotEmpty, IsEmail, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto{

    @ApiProperty({ example: 'user@example.com' })
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @ApiProperty({ example: 'P@ssword123' })
    @IsNotEmpty()
    @IsString()
    password!: string;

}