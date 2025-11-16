import { PartialType } from '@nestjs/mapped-types';
import { CreateEvaluationFieldDto } from './create-evaluation_field.dto';

export class UpdateEvaluationFieldDto extends PartialType(CreateEvaluationFieldDto) {}
