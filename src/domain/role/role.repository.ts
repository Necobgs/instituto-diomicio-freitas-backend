import { DataSource } from "typeorm";
import { BaseRepository } from "../shared/filter/base-repository";
import { Role } from "./entities/role.entity";
import { Injectable } from "@nestjs/common";


@Injectable()
export class RoleRepository extends BaseRepository<Role>{
    constructor(dataSource:DataSource){
        super(Role,dataSource)
    }
}