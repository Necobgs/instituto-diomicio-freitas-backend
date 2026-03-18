import { MigrationInterface, QueryRunner } from "typeorm";
import { Actions } from "./consts/actions";

export class ActionsMigration1710631234566 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        for (const action of Object.values(Actions)) {
            await queryRunner.query(`
                INSERT INTO actions (name, identifier) VALUES
                ('${action.name}', '${action.identifier}')
            `);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        for (const action of Object.values(Actions)) {
            await queryRunner.query(`
                DELETE FROM actions WHERE name = '${action.name}' AND identifier = '${action.identifier}'
            `);
        }
    }

}
