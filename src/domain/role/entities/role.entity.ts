import { Permission } from "../../permission/entities/permission.entity";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany } from "typeorm";

@Entity({name:'roles'})
export class Role extends BaseEntity{

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
