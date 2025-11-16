import { CreateDateColumn, PrimaryGeneratedColumn, BaseEntity as TypeOrmBaseEntity, UpdateDateColumn } from "typeorm";


export class BaseEntity extends TypeOrmBaseEntity{

    @PrimaryGeneratedColumn()
    id: string;

    @CreateDateColumn({name:'created_at'})
    created_at: Date;

    @UpdateDateColumn({name:'updated_at'})
    updated_at: Date;

}