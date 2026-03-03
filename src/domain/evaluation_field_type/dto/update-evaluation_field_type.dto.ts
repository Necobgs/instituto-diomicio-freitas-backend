import { PartialType } from '@nestjs/swagger';
import { CreateEvaluationFieldTypeDto } from './create-evaluation_field_type.dto';

export class UpdateEvaluationFieldTypeDto extends PartialType(CreateEvaluationFieldTypeDto) { }
