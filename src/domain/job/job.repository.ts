import { Injectable } from "@nestjs/common";
import { BaseRepository } from "../shared/filter/base-repository";
import { Job } from "./entities/job.entity";
import { DataSource } from "typeorm";



@Injectable()
export class JobRepository extends BaseRepository<Job> {
    constructor(dataSource: DataSource) {
        super(Job, dataSource)
    }
}