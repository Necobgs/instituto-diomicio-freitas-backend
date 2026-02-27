import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm";
import * as bcrypt from 'bcrypt'
import { AggregateRoot } from "../../shared/aggregate-root";
import { encryptPassword } from "../../../utils/encrypt-password";


@Entity({name:'users'})
export class User extends AggregateRoot{

    @Column()
    username!: string

    @Column()
    password!: string;

    @Column({default:true})
    mustChangePassword!: boolean;

    @BeforeInsert()
    async hash_password(){
        this.password = await encryptPassword(this.password)
    }

}