import { SetMetadata } from "@nestjs/common";


export const KEY_FILTER = 'filter';

const FILTER_OPTIONS = [
    'greater then or equal',
    'lower then or equal',
    'greater then',
    'lower then',
    'equals',
    'contains',
    'not contains',
    'not equal'
] as const;

export type FilterOption = typeof FILTER_OPTIONS[number];

export const Filter = (option:FilterOption) => SetMetadata(KEY_FILTER,option)