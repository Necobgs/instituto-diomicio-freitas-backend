import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsOptional, IsPositive } from "class-validator";

export class CreateReferralDto {

    @ApiProperty()
    @IsPositive()
    @IsNotEmpty()
    studentId: number;

    @ApiProperty()
    @IsPositive()
    @IsNotEmpty()
    enterpriseId: number;

    @ApiProperty()
    @IsPositive()
    @IsNotEmpty()
    jobId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    admissionDate: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsDateString()
    terminationDateIeedf?: string;
}