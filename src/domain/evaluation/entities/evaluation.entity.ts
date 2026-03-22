import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { AggregateRoot } from '../../shared/aggregate-root';
import { User } from '../../user/entities/user.entity';
import { Student } from '../../student/entities/student.entity';

@Entity('evaluations')
export class Evaluation extends AggregateRoot {

    @ManyToOne(() => Student, (student) => student.evaluations)
    @JoinColumn({ name: 'student_id' })
    student: Student;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ type: 'date', name: 'entry_date' })
    entryDate: string;

    @Column({ type: 'date' })
    date: string;

    @Column({ type: 'float', name: 'interview_note', nullable: true })
    interviewNote: number;

    @Column({ type: 'float', nullable: true })
    note: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q01: string;

    @Column({ type: 'char', length: 1, nullable: false })
    q02: string;

    @Column({ type: 'char', length: 1, nullable: false })
    q03: string;

    @Column({ type: 'char', length: 1, nullable: false })
    q04: string;

    @Column({ type: 'char', length: 1, nullable: false })
    q05: string;

    @Column({ type: 'char', length: 1, nullable: false })
    q06: string;

    @Column({ type: 'char', length: 1, nullable: false })
    q07: string;

    @Column({ type: 'char', length: 1, nullable: false })
    q08: string;

    @Column({ type: 'char', length: 1, nullable: false })
    q09: string;

    @Column({ type: 'char', length: 1, nullable: false })
    q10: string;

    @Column({ type: 'char', length: 1, nullable: false })
    q11: string;

    @Column({ type: 'char', length: 1, nullable: false })
    q12: string;

    @Column({ type: 'char', length: 1, nullable: false })
    q13: string;

    @Column({ type: 'char', length: 1, nullable: false })
    q14: string;

    @Column({ type: 'char', length: 1, nullable: false })
    q15: string;

    @Column({ type: 'char', length: 1, nullable: false })
    q16: string;

    @Column({ type: 'char', length: 1, nullable: false })
    q17: string;

    @Column({ type: 'char', length: 1, nullable: false })
    q18: string;

    @Column({ type: 'char', length: 1, nullable: false })
    q19: string;

    @Column({ type: 'char', length: 1, nullable: false })
    q20: string;

    @Column({ type: 'char', length: 1, nullable: false })
    q21: string;

    @Column({ type: 'char', length: 1, nullable: false })
    q22: string;

    @Column({ type: 'char', length: 1, nullable: false })
    q23: string;

    @Column({ type: 'char', length: 1, nullable: false })
    q24: string;

    @Column({ type: 'char', length: 1, nullable: false })
    q25: string;

    @Column({ type: 'char', length: 1, nullable: false })
    q26: string;

    @Column({ type: 'char', length: 1, nullable: false })
    q27: string;

    @Column({ type: 'char', length: 1, nullable: false })
    q28: string;

    @Column({ type: 'char', length: 1, nullable: false })
    q29: string;

    @Column({ type: 'char', length: 1, nullable: false })
    q30: string;

    @Column({ type: 'char', length: 1, nullable: false })
    q31: string;

    @Column({ type: 'char', length: 1, nullable: false })
    q32: string;

    @Column({ type: 'char', length: 1, nullable: false })
    q33: string;

    @Column({ type: 'char', length: 1, nullable: false })
    q34: string;

    @Column({ type: 'char', length: 1, nullable: false })
    q35: string;

    @Column({ type: 'char', length: 1, nullable: false })
    q36: string;

    @Column({ type: 'char', length: 1, nullable: false })
    q37: string;

    @Column({ type: 'char', length: 1, nullable: false })
    q38: string;

    @Column({ type: 'char', length: 1, nullable: false })
    q39: string;

    @Column({ type: 'char', length: 1, nullable: false })
    q40: string;

    @Column({ type: 'char', length: 1, nullable: false })
    q41: string;

    @Column({ type: 'char', length: 1, nullable: false })
    q42: string;

    @Column({ type: 'char', length: 1, nullable: false })
    q43: string;

    @Column({ type: 'char', length: 1, nullable: false })
    q44: string;

    @Column({ type: 'char', length: 1, nullable: false })
    q45: string;

    @Column({ type: 'char', length: 1, nullable: false })
    q46: string;

    @Column({ type: 'varchar', nullable: false })
    q47: string;

    @Column({ type: 'varchar', nullable: false })
    q48: string;

    @Column({ type: 'varchar', nullable: false })
    q49: string;
}