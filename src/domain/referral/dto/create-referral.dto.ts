import { IsDateString, IsNotEmpty, IsOptional, IsPositive } from "class-validator";

export class CreateReferralDto {

    @IsPositive()
    @IsNotEmpty()
    studentId: number;

    @IsPositive()
    @IsNotEmpty()
    enterpriseId: number;

    @IsPositive()
    @IsNotEmpty()
    jobId: number;

    @IsNotEmpty()
    @IsDateString()
    admissionDate: string;

    @IsOptional()
    @IsDateString()
    terminationDateIeedf?: string;
}