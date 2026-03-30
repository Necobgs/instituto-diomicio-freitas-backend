import { Entity, Column, ManyToOne } from "typeorm";
import { AggregateRoot } from "../../shared/aggregate-root";
import { Student } from "../../student/entities/student.entity";

@Entity({ name: 'monitorings' })
export class Monitoring extends AggregateRoot {

    @Column({ nullable: true })
    observations?: string;

    @Column({ name: 'visit_date', type: 'date' })
    visitDate!: Date;

    @ManyToOne(() => Student, student => student.monitorings)
    student!: Student;
}
