import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { AggregateRoot } from "../../shared/aggregate-root";
import { Enterprise } from "../../enterprise/entities/enterprise.entity";
import { Monitoring } from "../../monitoring/entities/monitoring.entity";
import { Evaluation } from "../../evaluation/entities/evaluation.entity";

@Entity({ name: 'students' })
export class Student extends AggregateRoot {

    @Column()
    name!: string;

    @Column()
    phone!: string;

    @Column({ type: 'date' })
    date_birthday!: Date;

    @Column({ length: 15, unique: true })
    cpf!: string;

    @ManyToOne(() => Enterprise, enterprise => enterprise.students)
    enterprise?: Enterprise;

    @OneToMany(() => Monitoring, monitoring => monitoring.student, { cascade: ['soft-remove', 'insert', 'update', 'recover'] })
    monitorings?: Monitoring[];

    @OneToMany(() => Evaluation, evaluation => evaluation.student, { cascade: ['soft-remove', 'insert', 'update', 'recover'] })
    evaluations?: Evaluation[];
}