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
	date: string;

	@IsNumber()
	@IsOptional()
	interviewNote: number;

	@IsNumber()
	@IsOptional()
	note: number;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q01: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q02: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q03: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q04: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q05: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q06: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q07: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q08: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q09: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q10: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q11: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q12: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q13: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q14: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q15: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q16: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q17: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q18: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q19: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q20: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q21: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q22: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q23: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q24: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q25: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q26: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q27: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q28: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q29: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q30: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q31: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q32: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q33: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q34: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q35: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q36: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q37: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q38: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q39: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q40: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q41: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q42: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q43: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q44: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q45: string;

	@IsString()
	@Length(1, 1)
	@IsIn(['a', 'b', 'c', 'd'])
	q46: string;

	@IsString()
	@IsNotEmpty()
	q47: string;

	@IsString()
	@IsNotEmpty()
	q48: string;

	@IsString()
	@IsNotEmpty()
	q49: string;

}