import { PartialType } from '@nestjs/swagger';
import { CreateEvaluationFieldDto } from './create-evaluation_field.dto';

export class UpdateEvaluationFieldDto extends PartialType(CreateEvaluationFieldDto) { }
