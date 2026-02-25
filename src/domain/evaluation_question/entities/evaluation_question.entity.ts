import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import { AggregateRoot } from "../../shared/aggregate-root";
import { Evaluation } from "../../evaluation/entities/evaluation.entity";
import { EvaluationField } from "../../evaluation_field/entities/evaluation_field.entity";
@Entity({name:'evaluation_questions'})
export class EvaluationQuestion extends AggregateRoot {

    @Column()
    question!: string;

    @ManyToOne(() => Evaluation, evaluation => evaluation.questions)
    evaluation!: Evaluation;

    @OneToMany(() => EvaluationField, f => f.question)
    fields?: EvaluationField[];
}
