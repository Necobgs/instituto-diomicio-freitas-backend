import { Column, Entity } from "typeorm";
import { AggregateRoot } from "../../shared/aggregate-root";

@Entity({ name: 'jobs' })
export class Job extends AggregateRoot {

    @Column({ unique: true })
    name!: string;

}
