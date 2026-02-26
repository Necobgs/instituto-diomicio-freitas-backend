import { BeforeInsert, Column, Entity } from "typeorm";
import * as bcrypt from 'bcrypt'
import { AggregateRoot } from "../../shared/aggregate-root";


@Entity({name:'users'})
export class User extends AggregateRoot{

    @Column()
    username!: string

    @Column()
    password!: string;

    @Column()
    email!: string

    @BeforeInsert()
    async hash_password(){
        this.password = await bcrypt.hash(this.password,10)
    }

}