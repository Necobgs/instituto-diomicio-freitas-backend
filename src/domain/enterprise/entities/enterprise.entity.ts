import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../shared/base-entity";

@Entity({name:'enterprises'})
export class Enterprise extends BaseEntity{

    @Column()
    name:string;

    @Column()
    cnpj: string;

    @Column()
    phone: string;

    @Column()
    enabled: boolean

}