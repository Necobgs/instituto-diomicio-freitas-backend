import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { Resource } from "./entities/resource.entity";
import { BaseRepository } from "../shared/filter/base-repository";


@Injectable()
export class ResourceRepository extends BaseRepository<Resource> {
    constructor(dataSource: DataSource) {
        super(Resource, dataSource);
    }
}