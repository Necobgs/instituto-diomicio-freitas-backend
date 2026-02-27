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

    @Column()
    email!: string

    @Column({ name: 'reset_password_token', nullable: true, type:'varchar' })
    resetPasswordToken?: string | null;

    @Column({ name: 'reset_password_expires', type: 'timestamp', nullable: true })
    resetPasswordExpires?: Date | null;

    @BeforeInsert()
    async hash_password(){
        this.password = await encryptPassword(this.password)
    }

}