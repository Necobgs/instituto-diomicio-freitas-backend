import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto{

    @ApiProperty({ example: 'John Doe' })
    @IsNotEmpty()
    @IsString()
    username!: string;

    @ApiProperty({ example: 'P@ssword123' })
    @IsNotEmpty()
    @IsString()
    password!: string;

}