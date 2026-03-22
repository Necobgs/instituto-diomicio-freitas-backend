import { BeforeInsert, Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { AggregateRoot } from "../../shared/aggregate-root";
import { encryptPassword } from "../../../utils/encrypt-password";
import { Permission } from "../../permission/entities/permission.entity";


@Entity({ name: 'users' })
export class User extends AggregateRoot {

    @Column()
    username!: string

    @Column({ select: false })
    password!: string;

    @Column({ unique: true })
    email!: string;

    @Column({ unique: true })
    cpf!: string;

    @ManyToMany(() => Permission)
    @JoinTable({
        name: 'users_permissions',
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

    @Column({ name: 'must_change_password', default: true })
    mustChangePassword!: boolean;

    @Column({ name: 'token_password_change', nullable: true, type: `uuid`, select: false })
    tokenPasswordChange!: string | null;

    @Column({ name: 'token_password_change_expires_at', nullable: true, type: 'timestamptz', select: false })
    tokenPasswordChangeExpiresAt!: Date | null;

    @BeforeInsert()
    async hash_password() {
        this.password = await encryptPassword(this.password)
    }

}