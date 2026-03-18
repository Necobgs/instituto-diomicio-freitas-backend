import { Column, Entity, OneToMany } from "typeorm";
import { AggregateRoot } from "../../shared/aggregate-root";
import { Permission } from "../../permission/entities/permission.entity";

@Entity({ name: 'actions' })
export class Action extends AggregateRoot {
    @Column({ type: 'varchar', unique: true })
    name: string;

    @Column({ type: 'varchar', unique: true })
    identifier: string;

    @OneToMany(() => Permission, (permission) => permission.action)
    permissions: Permission[];
}
