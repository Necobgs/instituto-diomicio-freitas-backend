import {
    Entity,
    Column,
} from 'typeorm';
import { AggregateRoot } from '../../shared/aggregate-root';

@Entity('referrals')
export class Referral extends AggregateRoot {

    @Column({ name: 'student_id' })
    student_id: number;

    @Column({ name: 'enterprise_id' })
    enterprise_id: number;

    @Column({ name: 'job_id' })
    job_id: number;

    @Column({ type: 'date', nullable: true })
    admission_date: string;

    @Column({ type: 'date', nullable: true })
    termination_date_ieedf: string;
}