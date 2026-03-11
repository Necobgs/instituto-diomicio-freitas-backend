import {
	IsNotEmpty,
	IsOptional,
	IsDateString,
	IsInt,
	IsNumber,
	IsString,
	Length,
} from 'class-validator';

export class CreateEvaluationDto {

	@IsInt()
	@IsNotEmpty()
	studentId: number;

	@IsInt()
	@IsNotEmpty()
	userId: number;

	@IsDateString()
	@IsNotEmpty()
	entryDate: string;

	@IsDateString()
	@IsNotEmpty()
	date: string;

	@IsNumber()
	@IsOptional()
	interviewNote: number;

	@IsNumber()
	@IsOptional()
	note: number;

	@IsString()
	@Length(1, 1)
	q01: string;

	@IsString()
	@Length(1, 1)
	q02: string;

	@IsString()
	@Length(1, 1)
	q03: string;

	@IsString()
	@Length(1, 1)
	q04: string;

	@IsString()
	@Length(1, 1)
	q05: string;

	@IsString()
	@Length(1, 1)
	q06: string;

	@IsString()
	@Length(1, 1)
	q07: string;

	@IsString()
	@Length(1, 1)
	q08: string;

	@IsString()
	@Length(1, 1)
	q09: string;

	@IsString()
	@Length(1, 1)
	q10: string;

	@IsString()
	@Length(1, 1)
	q11: string;

	@IsString()
	@Length(1, 1)
	q12: string;

	@IsString()
	@Length(1, 1)
	q13: string;

	@IsString()
	@Length(1, 1)
	q14: string;

	@IsString()
	@Length(1, 1)
	q15: string;

	@IsString()
	@Length(1, 1)
	q16: string;

	@IsString()
	@Length(1, 1)
	q17: string;

	@IsString()
	@Length(1, 1)
	q18: string;

	@IsString()
	@Length(1, 1)
	q19: string;

	@IsString()
	@Length(1, 1)
	q20: string;

	@IsString()
	@Length(1, 1)
	q21: string;

	@IsString()
	@Length(1, 1)
	q22: string;

	@IsString()
	@Length(1, 1)
	q23: string;

	@IsString()
	@Length(1, 1)
	q24: string;

	@IsString()
	@Length(1, 1)
	q25: string;

	@IsString()
	@Length(1, 1)
	q26: string;

	@IsString()
	@Length(1, 1)
	q27: string;

	@IsString()
	@Length(1, 1)
	q28: string;

	@IsString()
	@Length(1, 1)
	q29: string;

	@IsString()
	@Length(1, 1)
	q30: string;

	@IsString()
	@Length(1, 1)
	q31: string;

	@IsString()
	@Length(1, 1)
	q32: string;

	@IsString()
	@Length(1, 1)
	q33: string;

	@IsString()
	@Length(1, 1)
	q34: string;

	@IsString()
	@Length(1, 1)
	q35: string;

	@IsString()
	@Length(1, 1)
	q36: string;

	@IsString()
	@Length(1, 1)
	q37: string;

	@IsString()
	@Length(1, 1)
	q38: string;

	@IsString()
	@Length(1, 1)
	q39: string;

	@IsString()
	@Length(1, 1)
	q40: string;

	@IsString()
	@Length(1, 1)
	q41: string;

	@IsString()
	@Length(1, 1)
	q42: string;

	@IsString()
	@Length(1, 1)
	q43: string;

	@IsString()
	@Length(1, 1)
	q44: string;

	@IsString()
	@Length(1, 1)
	q45: string;

	@IsString()
	@Length(1, 1)
	q46: string;

	@IsString()
	@IsOptional()
	q47: string;

	@IsString()
	@IsOptional()
	q48: string;

	@IsString()
	@IsOptional()
	q49: string;

}