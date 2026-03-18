import { MigrationInterface, QueryRunner } from "typeorm";
import { DEFAULT_PASSWORD } from "../consts/default-password";

export class UserFullPermissionsMigration1710631234575 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const user = await queryRunner.query(`SELECT id FROM users WHERE email = '${process.env.ADMIN_EMAIL}'`);
        let user_id = '';
        if (user.length === 0) {
            const id_inserted = await queryRunner.query(`
                INSERT INTO users (username, email, password,cpf) 
                VALUES ('ADMIN', '${process.env.ADMIN_EMAIL}', '${DEFAULT_PASSWORD}', '${process.env.ADMIN_CPF}') RETURNING id`);
            user_id = id_inserted[0].id;
        } else {
            user_id = user[0].id;
        }
        const permissions = await queryRunner.query(`SELECT id FROM permissions`);

        for (const permission of permissions) {
            await queryRunner.query(`
                    INSERT INTO users_permissions (user_id, permission_id) VALUES
                    ('${user_id}', '${permission.id}')
                `);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const user_id = await queryRunner.query(`SELECT id FROM users WHERE email = '${process.env.ADMIN_EMAIL}'`);
        const permissions = await queryRunner.query(`SELECT id FROM permissions`);

        for (const permission of permissions) {
            await queryRunner.query(`
                    DELETE FROM users_permissions WHERE user_id = '${user_id[0].id}' AND permission_id = '${permission.id}'
                `);
        }
    }
}

