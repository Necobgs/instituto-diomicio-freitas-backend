import {
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
    BaseEntity as TypeOrmBaseEntity,
    PrimaryGeneratedColumn
} from "typeorm";



export abstract class AggregateRoot extends TypeOrmBaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @CreateDateColumn({
        name:'created_at',
        type:'time with time zone',
        default: () => 'CURRENT_TIMESTAMP'
    })
    created_at:Date;

    @UpdateDateColumn({
        name:'updated_at',
        type:'time with time zone',
        default:()=> 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
    })
    updated_at:Date;

    @DeleteDateColumn({
        name:'deleted_at',
        type:'time with time zone',
    })
    deleted_at: Date;

}