import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../shared/base-entity";

@Entity({name:'students'})
export class Student extends BaseEntity{

    @Column()
    name: string;

    @Column()
    phone: string;

    @Column({type:'date'})
    date_birthday: Date;

    @Column({length:15})
    cpf: string;

    @Column()
    enabled: boolean

}