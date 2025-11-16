import { IsArray, IsOptional, IsString } from "class-validator";
import { Filter } from "../../shared/filter/filter.decorator";
import { User } from "../entities/user.entity";


export class FilterUser{

    @Filter<User>({ operator: '$in', column_name: 'username' })
    username?: string[]

}