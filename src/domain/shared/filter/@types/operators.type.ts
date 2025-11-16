export type OPERATORS = 
    '$eq'    |
    '$ne'    |
    '$gt'    |
    '$gte'   |
    '$lt'    |
    '$lte'   |
    '$in'    |
    '$nin'   |
    '$like'  |
    '$nlike' ;


export const OPERATORS_OBJECT = {
    '$eq'    : '=',
    '$ne'    : '!=',
    '$gt'    : '>',
    '$gte'   : '>=',
    '$lt'    : '<',
    '$lte'   : '<=',
    '$in'    : 'in',
    '$nin'   : 'NOT IN',
    '$like'  : 'LIKE',
    '$nlike' : 'NOT LIKE',
}