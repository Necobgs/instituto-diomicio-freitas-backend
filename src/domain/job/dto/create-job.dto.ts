import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class CreateJobDto {
    @ApiProperty({ example: 'Software enginear' })
    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => value.toUpperCase())
    name: string;
}
