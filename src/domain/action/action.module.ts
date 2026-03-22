import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Action } from "./entities/action.entity";
import { ActionController } from "./action.controller";
import { ActionService } from "./action.service";
import { ActionRepository } from "./action.repository";


@Module({
    imports: [TypeOrmModule.forFeature([Action])],
    controllers: [ActionController],
    providers: [ActionService, ActionRepository],
    exports: [ActionService]
})
export class ActionModule { }