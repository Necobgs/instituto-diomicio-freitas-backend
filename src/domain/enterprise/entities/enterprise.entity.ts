import { Column, Entity, OneToMany } from "typeorm";
import { AggregateRoot } from "../../shared/aggregate-root";
import { Student } from "../../student/entities/student.entity";

@Entity({name:'enterprises'})
export class Enterprise extends AggregateRoot{

    @Column()
    name!:string;

    @Column()
    cnpj!: string;

    @Column()
    phone!: string;

    @OneToMany(() => Student, student => student.enterprise)
    students?: Student[];

}
