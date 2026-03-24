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

    @Column({ type: 'date' })
    date: string;

    @Column({ type: 'float', name: 'interview_note', nullable: true })
    interviewNote: number;

    @Column({ type: 'float', nullable: true })
    note: number;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q01: string;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q02: string;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q03: string;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q04: string;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q05: string;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q06: string;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q07: string;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q08: string;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q09: string;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q10: string;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q11: string;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q12: string;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q13: string;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q14: string;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q15: string;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q16: string;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q17: string;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q18: string;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q19: string;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q20: string;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q21: string;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q22: string;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q23: string;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q24: string;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q25: string;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q26: string;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q27: string;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q28: string;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q29: string;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q30: string;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q31: string;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q32: string;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q33: string;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q34: string;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q35: string;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q36: string;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q37: string;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q38: string;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q39: string;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q40: string;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q41: string;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q42: string;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q43: string;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q44: string;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q45: string;

    @Column({ type: 'char', length: 1, nullable: false, enum: ['a', 'b', 'c', 'd'] })
    q46: string;

    @Column({ type: 'varchar', nullable: false })
    q47: string;

    @Column({ type: 'varchar', nullable: false })
    q48: string;

    @Column({ type: 'varchar', nullable: false })
    q49: string;
}