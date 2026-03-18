import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { Action } from "./entities/action.entity";
import { BaseRepository } from "../shared/filter/base-repository";


@Injectable()
export class ActionRepository extends BaseRepository<Action> {
    constructor(dataSource: DataSource) {
        super(Action, dataSource);
    }
}
