import { ObjectLiteral, Repository, SelectQueryBuilder } from "typeorm";
import { KEY_FILTER } from "./filter.decorator";
import { FilterInfo } from "./interface/filter_info.interface";
import { OPERATORS_OBJECT } from "./@types/operators.type";

export class FilterEngine<Entity extends ObjectLiteral>{

    constructor(private readonly repository:Repository<Entity>){}

    async exists(filter:object,qb?:SelectQueryBuilder<Entity>){
        const queryBuilder = this.getQueryBuilder(filter,qb)
        return await queryBuilder.getExists()
    }

    async filterOne(filter:object,qb?:SelectQueryBuilder<Entity>){
        const queryBuilder = this.getQueryBuilder(filter,qb)
        return await queryBuilder.getOne()
    }

    async filterAll(filter:object,qb?:SelectQueryBuilder<Entity>){
        const queryBuilder = this.getQueryBuilder(filter,qb)
        return await queryBuilder.getMany()
    }

    getQueryBuilder(filter: object,qb?:SelectQueryBuilder<Entity>){
        
        const keys = Object.keys(filter)
        const prototype = filter.constructor.prototype

        if(!qb){
            qb = this.repository.createQueryBuilder()
        }

        console.log(keys)

        keys.forEach((key)=>{

            const value = (filter as any)[key]

            if(!value) return;

            const filterInfo : FilterInfo<any> = Reflect.getMetadata(KEY_FILTER,prototype,key) 

            if(!filterInfo) return;

            this.applyOperator(qb,filterInfo,value)

        })
    
        console.log(qb.getQueryAndParameters())

        return qb;
    }

    private applyOperator(qb:SelectQueryBuilder<Entity>,filterInfo:FilterInfo<Entity>,value:any){

        const operator = OPERATORS_OBJECT[filterInfo.operator];
        const column_name     = String(filterInfo.column_name);
        const alias           = qb.alias;
        const paramName       = `${column_name}_${Math.random().toString(36).slice(2)}`;


        // Operadores in e not in
        if(['$in','$nin'].includes(filterInfo.operator)){

            value = Array.isArray(value) ? value : [value]

            qb.andWhere(`${alias}.${column_name} ${operator} (:...${paramName})`,{[paramName]:value})
            return qb
        }

        // Operadores like e not like
        if(['$like','$nlike'].includes(filterInfo.operator)){
            qb.andWhere(`${alias}.${column_name} ${operator} :${paramName}`,{[paramName]:`%${value}%`})
            return qb
        }

        // Demais operadores seguem a mesma forma
        qb.andWhere(`${alias}.${column_name} ${operator} :${paramName}`,{[paramName]:value})
        return qb

    }

}