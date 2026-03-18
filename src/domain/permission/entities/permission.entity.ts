import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { AggregateRoot } from "../../shared/aggregate-root";
import { Action } from "../../action/entities/action.entity";
import { Resource } from "../../resource/entities/resource.entity";


@Entity({ name: 'permissions' })
export class Permission extends AggregateRoot {

    @ManyToOne(() => Resource, (resource) => resource.permissions)
    @JoinColumn({ name: 'resource_id' })
    resource: Resource;

    @ManyToOne(() => Action, (action) => action.permissions)
    @JoinColumn({ name: 'action_id' })
    action: Action;

}