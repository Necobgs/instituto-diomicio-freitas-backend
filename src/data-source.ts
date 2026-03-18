import { DataSource } from "typeorm";
import * as dotenv from 'dotenv'

dotenv.config()

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: +process.env.DATABASE_PG_PORT!,
    username: process.env.DATABASE_PG_USER!,
    password: process.env.DATABASE_PG_PASSWORD!,
    database: process.env.DATABASE_PG_NAME!,
    migrationsTableName: 'migrations',
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/migrations/*.ts'],
})