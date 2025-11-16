import { BeforeInsert, Column, Entity } from "typeorm";
import * as bcrypt from 'bcrypt'
import { BaseEntity } from "../../shared/base-entity";

@Entity({name:'users'})
export class User extends BaseEntity{

    @Column()
    username: string

    @Column()
    password: string;

    @Column()
    email: string

    @Column()
    enabled: boolean

    @BeforeInsert()
    async hash_password(){
        this.password = await bcrypt.hash(this.password,10)
    }

}