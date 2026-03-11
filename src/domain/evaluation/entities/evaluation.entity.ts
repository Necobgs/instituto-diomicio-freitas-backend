import {
    Entity,
    Column,
    ManyToOne,
} from 'typeorm';
import { AggregateRoot } from '../../shared/aggregate-root';
import { User } from '../../user/entities/user.entity';
import { Student } from '../../student/entities/student.entity';

@Entity('evaluations')
export class Evaluation extends AggregateRoot {

    @Column({ name: 'student_id' })
    @ManyToOne(() => Student, (student) => student.evaluations)
    student: Student;

    @Column({ name: 'user_id' })
    @ManyToOne(() => User)
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
    q01: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q02: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q03: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q04: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q05: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q06: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q07: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q08: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q09: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q10: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q11: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q12: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q13: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q14: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q15: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q16: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q17: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q18: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q19: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q20: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q21: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q22: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q23: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q24: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q25: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q26: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q27: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q28: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q29: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q30: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q31: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q32: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q33: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q34: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q35: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q36: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q37: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q38: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q39: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q40: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q41: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q42: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q43: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q44: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q45: number;

    @Column({ type: 'char', length: 1, nullable: false })
    q46: number;

    @Column({ type: 'varchar', nullable: false })
    q47: string;

    @Column({ type: 'varchar', nullable: false })
    q48: string;

    @Column({ type: 'varchar', nullable: false })
    q49: string;
}