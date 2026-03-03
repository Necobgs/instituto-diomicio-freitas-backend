import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import * as bcrypt from 'bcrypt'
import { AggregateRoot } from "../../shared/aggregate-root";
import { encryptPassword } from "../../../utils/encrypt-password";
import { Role } from "../../role/entities/role.entity";
import { Permission } from "../../permission/entities/permission.entity";


@Entity({ name: 'users' })
export class User extends AggregateRoot {

    @Column()
    username!: string

    @Column()
    password!: string;

    @Column({ default: true })
    mustChangePassword!: boolean;

    @Column()
    email!: string;

    @Column()
    cpf!: string;

    @ManyToOne(()=> Role)
    @JoinColumn({name:'user_role'})
    role: Role;

    @ManyToMany(() => Permission)
    @JoinTable({
        name:'users_permissions',
        joinColumn: {
            name: 'user_id',    
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'permission_id',
            referencedColumnName: 'id',
        }
        })
    permissions: Permission[];

    @BeforeInsert()
    async hash_password() {
        this.password = await encryptPassword(this.password)
    }

}