import { PartialType } from '@nestjs/mapped-types';
import { CreateEvaluationFieldTypeDto } from './create-evaluation_field_type.dto';

export class UpdateEvaluationFieldTypeDto extends PartialType(CreateEvaluationFieldTypeDto) {}
