import { MigrationInterface, QueryRunner } from "typeorm";

export class PermissionsMigration1710631234567 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const resources = await queryRunner.query(`SELECT id FROM resources`);
        const actions = await queryRunner.query(`SELECT id FROM actions`);


        for (const resource of resources) {
            for (const action of actions) {
                await queryRunner.query(`
                    INSERT INTO permissions (resource_id, action_id) VALUES
                    ('${resource.id}', '${action.id}')
                `);
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const resources = await queryRunner.query(`SELECT id FROM resources`);
        const actions = await queryRunner.query(`SELECT id FROM actions`);

        for (const resource of resources) {
            for (const action of actions) {
                await queryRunner.query(`
                    DELETE FROM permissions WHERE resource_id = '${resource.id}' AND action_id = '${action.id}'
                `);
            }
        }
    }

}
