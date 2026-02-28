import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from "class-transformer";

export class SignInDto {

    @ApiProperty({ example: 'John Doe' })
    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => value.toUpperCase())
    username!: string;

    @ApiProperty({ example: 'P@ssword123' })
    @IsNotEmpty()
    @IsString()
    password!: string;

}