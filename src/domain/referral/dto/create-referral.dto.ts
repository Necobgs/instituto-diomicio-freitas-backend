import { IsDateString, IsNotEmpty, IsOptional, IsPositive } from "class-validator";

export class CreateReferralDto {

    @IsPositive()
    @IsNotEmpty()
    student_id: number;

    @IsPositive()
    @IsNotEmpty()
    enterprise_id: number;

    @IsPositive()
    @IsNotEmpty()
    job_id: number;

    @IsNotEmpty()
    @IsDateString()
    admission_date: string;

    @IsOptional()
    @IsDateString()
    termination_date_ieedf?: string;
}