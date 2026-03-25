import {
    Entity,
    Column,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { AggregateRoot } from '../../shared/aggregate-root';
import { Student } from '../../student/entities/student.entity';
import { Enterprise } from '../../enterprise/entities/enterprise.entity';
import { Job } from '../../job/entities/job.entity';

@Entity('referrals')
export class Referral extends AggregateRoot {

    @JoinColumn({ name: 'student_id' })
    @ManyToOne(() => Student, { cascade: ['soft-remove', 'recover', 'update'] })
    student: Student;

    @JoinColumn({ name: 'enterprise_id' })
    @ManyToOne(() => Enterprise, { cascade: ['soft-remove', 'recover', 'update'] })
    enterprise: Enterprise;

    @JoinColumn({ name: 'job_id' })
    @ManyToOne(() => Job, { cascade: ['soft-remove', 'recover', 'update'] })
    job: Job;

    @Column({ name: 'admission_date', type: 'date', nullable: true })
    admissionDate?: string;

    @Column({ name: 'termination_date_ieedf', type: 'date', nullable: true })
    terminationDateIeedf?: string;
}