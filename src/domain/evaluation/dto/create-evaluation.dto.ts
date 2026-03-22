import {
	IsNotEmpty,
	IsOptional,
	IsDateString,
	IsInt,
	IsNumber,
	IsString,
	Length,
	IsIn,
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
	@IsIn(['a', 'b', 'c', 'd', 'e'])
	q01: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd', 'e'])
	q02: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd', 'e'])
	q03: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd', 'e'])
	q04: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd', 'e'])
	q05: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd', 'e'])
	q06: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd', 'e'])
	q07: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd', 'e'])
	q08: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd', 'e'])
	q09: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd', 'e'])
	q10: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd', 'e'])
	q11: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd', 'e'])
	q12: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd', 'e'])
	q13: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd', 'e'])
	q14: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd', 'e'])
	q15: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd', 'e'])
	q16: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd', 'e'])
	q17: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd', 'e'])
	q18: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd', 'e'])
	q19: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd', 'e'])
	q20: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd', 'e'])
	q21: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd', 'e'])
	q22: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd', 'e'])
	q23: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd', 'e'])
	q24: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd', 'e'])
	q25: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd', 'e'])
	q26: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd', 'e'])
	q27: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd', 'e'])
	q28: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd', 'e'])
	q29: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd', 'e'])
	q30: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd', 'e'])
	q31: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd', 'e'])
	q32: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd', 'e'])
	q33: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd', 'e'])
	q34: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd', 'e'])
	q35: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd', 'e'])
	q36: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd', 'e'])
	q37: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd', 'e'])
	q38: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd', 'e'])
	q39: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd', 'e'])
	q40: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd', 'e'])
	q41: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd', 'e'])
	q42: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd', 'e'])
	q43: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd', 'e'])
	q44: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd', 'e'])
	q45: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd', 'e'])
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