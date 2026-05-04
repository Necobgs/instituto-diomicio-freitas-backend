import {
  Brackets,
  EntityTarget,
  ObjectLiteral,
  SelectQueryBuilder,
} from 'typeorm';

import { isObject } from '../../../utils/is-object';

/* =========================
 * Tipos
 * ========================= */

export type LogicalOperator = '$or' | '$and' | '$not';

export type Operator =
  | '$eq'
  | '$ne'
  | '$gt'
  | '$gte'
  | '$lt'
  | '$lte'
  | '$in'
  | '$nin'
  | '$like'
  | '$ilike'
  | '$null'
  | '$between'
  | '$contains'
  | '$contained'
  | '$overlap'
  | '$startsWith'
  | '$endsWith';

type Primitive = string | number | boolean | null;

export type Condition = {
  [field: string]: { [key in Operator]?: Primitive | Primitive[] } | Primitive;
};

export interface LogicalFilter {
  $or?: Filter[];
  $and?: Filter[];
  $not?: Filter;
}

export type Filter = string | Condition | LogicalFilter;

/* =========================
 * CONTEXTO DE PARAMS
 * ========================= */

class ParamContext {
  private index = 0;

  next(field: string) {
    return `${field.replace('.', '_')}_${this.index++}`;
  }
}

/* =========================
 * API principal
 * ========================= */

export function applyFilters<T extends ObjectLiteral>(
  qb: SelectQueryBuilder<T>,
  target: EntityTarget<T>,
  alias: string,
  filter: Filter,
): SelectQueryBuilder<T> {
  const parsed = parseFilter(filter);
  if (!isObject(parsed)) return qb;

  const ctx = new ParamContext();

  applyRecursive(qb, target, alias, parsed, ctx);

  return qb;
}

/* =========================
 * RECURSIVO
 * ========================= */

function applyRecursive<T extends ObjectLiteral>(
  qb: SelectQueryBuilder<T>,
  target: EntityTarget<T>,
  alias: string,
  filter: any,
  ctx: ParamContext,
) {
  Object.entries(filter).forEach(([key, value]) => {
    switch (key as LogicalOperator) {
      case '$or':
        qb.andWhere(
          new Brackets((qbOr) => {
            (value as Filter[]).forEach((sub) => {
              qbOr.orWhere(
                new Brackets((qbSub) => {
                  applyRecursive(qbSub as any, target, alias, sub, ctx);
                }),
              );
            });
          }),
        );
        break;

      case '$and':
        qb.andWhere(
          new Brackets((qbAnd) => {
            (value as Filter[]).forEach((sub) => {
              qbAnd.andWhere(
                new Brackets((qbSub) => {
                  applyRecursive(qbSub as any, target, alias, sub, ctx);
                }),
              );
            });
          }),
        );
        break;

      case '$not':
        qb.andWhere(
          new Brackets((qbNot) => {
            applyRecursive(qbNot as any, target, alias, value as Filter, ctx);
          }),
        );

        const last = qb.expressionMap.wheres.at(-1);
        if (last) {
          last.condition = `NOT (${last.condition})`;
        }
        break;

      default:
        applyCondition(qb, target, alias, key, value, ctx);
    }
  });
}

/* =========================
 * Helpers
 * ========================= */

function parseFilter(filter: Filter): Filter | null {
  if (!filter) return null;

  if (typeof filter === 'string') {
    try {
      return JSON.parse(filter);
    } catch {
      return null;
    }
  }

  return filter;
}

function transformValue(value: any) {
  if (value === null) return { $null: true };

  if (!(typeof value === 'object' && !Array.isArray(value))) {
    return { $eq: value };
  }

  return value;
}

/* =========================
 * CONDITIONS
 * ========================= */

function applyCondition<T extends ObjectLiteral>(
  qb: SelectQueryBuilder<T>,
  target: EntityTarget<T>,
  alias: string,
  path: string,
  value: any,
  ctx: ParamContext,
) {
  const parsed = transformValue(value);

  if (path.includes('.')) {
    applyRelationCondition(qb, target, alias, path, parsed, ctx);
  } else {
    applySimpleCondition(qb, alias, path, parsed, ctx);
  }
}

/* =========================
 * SIMPLE
 * ========================= */

function applySimpleCondition<T extends ObjectLiteral>(
  qb: SelectQueryBuilder<T>,
  alias: string,
  field: string,
  value: any,
  ctx: ParamContext,
) {
  Object.entries(value).forEach(([operator, expected]) => {
    const path = `${alias}.${field}`;

    const { condition, params } = generateSqlForOperator(
      field,
      path,
      operator as Operator,
      expected,
      ctx,
    );

    qb.andWhere(condition, params);
  });
}

/* =========================
 * RELATIONS
 * ========================= */

function applyRelationCondition<T extends ObjectLiteral>(
  qb: SelectQueryBuilder<T>,
  target: EntityTarget<T>,
  alias: string,
  path: string,
  value: any,
  ctx: ParamContext,
) {
  const [relation, field] = path.split('.');
  const metadata = qb.connection.getMetadata(target);
  const relationMetadata = metadata.findRelationWithPropertyPath(relation);

  if (!relationMetadata) return;

  if (relationMetadata.isOneToOne || relationMetadata.isManyToOne) {
    const relationAlias = `${alias}_${relation}`;

    if (!qb.expressionMap.joinAttributes.some(j => j.alias.name === relationAlias)) {
      qb.leftJoin(`${alias}.${relation}`, relationAlias);
    }

    Object.entries(value).forEach(([operator, expected]) => {
      const path = `${relationAlias}.${field}`;

      const { condition, params } = generateSqlForOperator(
        field,
        path,
        operator as Operator,
        expected,
        ctx,
      );

      qb.andWhere(condition, params);
    });

    return;
  }

  // to-many (mantive tua lógica)
}

/* =========================
 * SQL
 * ========================= */

function generateSqlForOperator(
  field: string,
  path: string,
  operator: Operator,
  expectedValue: any,
  ctx: ParamContext,
): { condition: string; params: Record<string, any> } {
  let condition = '';
  let params: Record<string, any> = {};

  const paramName = ctx.next(field);

  switch (operator) {
    case '$eq':
      condition = `${path} = :${paramName}`;
      params[paramName] = expectedValue;
      break;

    case '$ne':
      condition = `${path} != :${paramName}`;
      params[paramName] = expectedValue;
      break;

    case '$gt':
      condition = `${path} > :${paramName}`;
      params[paramName] = expectedValue;
      break;

    case '$gte':
      condition = `${path} >= :${paramName}`;
      params[paramName] = expectedValue;
      break;

    case '$lt':
      condition = `${path} < :${paramName}`;
      params[paramName] = expectedValue;
      break;

    case '$lte':
      condition = `${path} <= :${paramName}`;
      params[paramName] = expectedValue;
      break;

    case '$in':
      condition = `${path} IN (:...${paramName})`;
      params[paramName] = expectedValue;
      break;

    case '$nin':
      condition = `${path} NOT IN (:...${paramName})`;
      params[paramName] = expectedValue;
      break;

    case '$like':
      condition = `${path} LIKE :${paramName}`;
      params[paramName] = expectedValue;
      break;

    case '$ilike':
      condition = `${path} ILIKE :${paramName}`;
      params[paramName] = expectedValue;
      break;

    case '$null':
      condition = expectedValue ? `${path} IS NULL` : `${path} IS NOT NULL`;
      break;

    case '$between': {
      const start = ctx.next(field + '_start');
      const end = ctx.next(field + '_end');

      condition = `${path} BETWEEN :${start} AND :${end}`;
      params[start] = expectedValue[0];
      params[end] = expectedValue[1];
      break;
    }

    case '$startsWith':
      condition = `${path} LIKE :${paramName}`;
      params[paramName] = `${expectedValue}%`;
      break;

    case '$endsWith':
      condition = `${path} LIKE :${paramName}`;
      params[paramName] = `%${expectedValue}`;
      break;

    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }

  return { condition, params };
}