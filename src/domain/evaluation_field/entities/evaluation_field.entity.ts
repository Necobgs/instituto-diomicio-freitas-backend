import { Entity, Column, ManyToOne } from "typeorm";
import { AggregateRoot } from "../../shared/aggregate-root";
import { EvaluationQuestion } from "../../evaluation_question/entities/evaluation_question.entity";
import { EvaluationFieldType } from "../../evaluation_field_type/entities/evaluation_field_type.entity";


@Entity({name:'evaluation_fields'})
export class EvaluationField extends AggregateRoot {

    @Column()
    label!: string;

    @ManyToOne(() => EvaluationQuestion, q => q.fields)
    question!: EvaluationQuestion;

    @ManyToOne(() => EvaluationFieldType, t => t.fields)
    type!: EvaluationFieldType;
}
