import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { AggregateRoot } from "../../shared/aggregate-root";
import { Enterprise } from "../../enterprise/entities/enterprise.entity";
import { Monitoring } from "../../monitoring/entities/monitoring.entity";
import { Evaluation } from "../../evaluation/entities/evaluation.entity";
import { Job } from "../../job/entities/job.entity";

@Entity({ name: 'students' })
export class Student extends AggregateRoot {

    @Column()
    name!: string;

    @Column()
    phone!: string;

    @Column({ name: 'responsible_name', nullable: true })
    responsibleName?: string;

    @Column({ name: 'responsible_phone', nullable: true })
    responsiblePhone?: string;

    @Column({ default: false, name: 'use_medicine' })
    useMedicine!: boolean;

    @Column({ type: 'text', nullable: true, name: 'info_medicine' })
    infoMedicine?: string;

    @Column({ type: 'timestamp with time zone', name: 'date_entry' })
    dateEntry!: Date;

    @Column({ type: 'date', name: 'date_birthday' })
    dateBirthday!: Date;

    @Column({ length: 15, unique: true })
    cpf!: string;

    @ManyToOne(() => Enterprise, enterprise => enterprise.students)
    @JoinColumn({ name: 'enterprise_id' })
    enterprise?: Enterprise;

    @ManyToOne(() => Job)
    @JoinColumn({ name: 'job_id' })
    job?: Job;

    @OneToMany(() => Monitoring, monitoring => monitoring.student, { cascade: ['soft-remove', 'insert', 'update', 'recover'] })
    monitorings?: Monitoring[];

    @OneToMany(() => Evaluation, evaluation => evaluation.student, { cascade: ['soft-remove', 'insert', 'update', 'recover'] })
    evaluations?: Evaluation[];
}