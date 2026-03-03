import { Column, Entity } from "typeorm";
import { AggregateRoot } from "../../shared/aggregate-root";


@Entity({name:'permissions'})
export class Permission extends AggregateRoot{

    @Column()
    resource: string;

    @Column()
    action: 'create' | 'read' | 'update' | 'delete';

}