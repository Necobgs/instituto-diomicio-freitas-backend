import { Injectable } from "@nestjs/common";
import { BaseRepository } from "../shared/filter/base-repository";
import { Referral } from "./entities/referral.entity";
import { DataSource } from "typeorm";


@Injectable()
export class ReferralRepository extends BaseRepository<Referral> {
    constructor(dataSource: DataSource) {
        super(Referral, dataSource);
    }
}