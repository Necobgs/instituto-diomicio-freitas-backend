import { Entity, Column, OneToMany } from "typeorm";
import { AggregateRoot } from "../../shared/aggregate-root";
import { EvaluationQuestion } from "../../evaluation_question/entities/evaluation_question.entity";
import { Monitoring } from "../../monitoring/entities/monitoring.entity";


@Entity({name:'evaluations'})
export class Evaluation extends AggregateRoot {

    @Column()
    title?: string;

    @OneToMany(() => EvaluationQuestion, q => q.evaluation)
    questions?: EvaluationQuestion[];

    @OneToMany(() => Monitoring, m => m.evaluation)
    monitorings?: Monitoring[];
}
