import { MigrationInterface, QueryRunner } from "typeorm";
import { Resources } from "../consts/resources";
import { Actions } from "../consts/actions";

export class Permissions1772497119389 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        for(const resource of Object.values(Resources)){
            for(const action of Object.values(Actions)){
                await queryRunner.query(`
                    INSERT INTO permissions (resource, action) VALUES
                    ('${resource}', '${action}')
                `);
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        for(const resource of Object.values(Resources)){
            for(const action of Object.values(Actions)){
                await queryRunner.query(`
                    DELETE FROM permissions WHERE resource = '${resource}' AND action = '${action}'
                `);
            }
        }
    }

}
