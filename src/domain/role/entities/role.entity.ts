import { Permission } from "../../permission/entities/permission.entity";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { AggregateRoot } from "../../shared/aggregate-root";

@Entity({name:'roles'})
export class Role extends AggregateRoot{

    @Column({unique:true})
    name:string;

    @ManyToMany(() => Permission)
    @JoinTable({
        name: 'roles_permissions',
        joinColumn: {
            name: 'role_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'permission_id',
            referencedColumnName: 'id',
        }
        })
    permissions: Permission[];


}
