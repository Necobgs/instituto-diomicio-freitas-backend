import { MigrationInterface, QueryRunner } from "typeorm";
import { Resources } from "./consts/resources";

export class ResourcesMigration1710631234565 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        for (const resource of Object.values(Resources)) {
            await queryRunner.query(`
                INSERT INTO resources (name, identifier) VALUES
                ('${resource.name}', '${resource.identifier}')
            `);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        for (const resource of Object.values(Resources)) {
            await queryRunner.query(`
                DELETE FROM resources WHERE name = '${resource.name}' AND identifier = '${resource.identifier}'
            `);
        }
    }

}
