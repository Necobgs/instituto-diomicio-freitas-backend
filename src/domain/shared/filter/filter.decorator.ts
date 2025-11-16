import { FilterInfo } from "./interface/filter_info.interface";


export const KEY_FILTER = Symbol('filter_info');

export const Filter = <Entity>(filterInfo:FilterInfo<Entity>) => {
    return (target:Object,propertyKey: string | symbol) => {

        Reflect.defineMetadata(KEY_FILTER,filterInfo,target, propertyKey)

    }
};