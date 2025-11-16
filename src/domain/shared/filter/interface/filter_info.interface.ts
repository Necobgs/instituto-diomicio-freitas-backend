import { OPERATORS } from "../@types/operators.type";

export interface FilterInfo<Entity> {
    operator: OPERATORS,
    column_name: keyof Entity
}