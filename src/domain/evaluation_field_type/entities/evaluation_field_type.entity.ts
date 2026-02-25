import { Entity, Column, OneToMany } from "typeorm";
import { AggregateRoot } from "../../shared/aggregate-root";
import { EvaluationField } from "../../evaluation_field/entities/evaluation_field.entity";

@Entity({name:'evaluation_field_types'})
export class EvaluationFieldType extends AggregateRoot {

    @Column()
    description?: string;

    @OneToMany(() => EvaluationField, field => field.type)
    fields?: EvaluationField[];
}
