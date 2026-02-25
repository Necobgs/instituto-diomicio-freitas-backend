import { Entity, Column, ManyToOne } from "typeorm";
import { AggregateRoot } from "../../shared/aggregate-root";
import { Student } from "../../student/entities/student.entity";
import { Evaluation } from "../../evaluation/entities/evaluation.entity";

@Entity({name:'monitorings'})
export class Monitoring extends AggregateRoot {

    @Column({nullable:true})
    notes?: string;

    @ManyToOne(() => Student, student => student.monitorings)
    student!: Student;

    @ManyToOne(() => Evaluation, evaluation => evaluation.monitorings)
    evaluation!: Evaluation;
}
