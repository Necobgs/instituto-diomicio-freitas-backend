import { Brackets, EntityTarget, ObjectLiteral, SelectQueryBuilder } from 'typeorm';
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

  Object.entries(parsed).forEach(([key, value]) => {
    switch (key as LogicalOperator) {
      case '$or':
        qb.andWhere(
          new Brackets((qbOr) => {
            (value as Filter[]).forEach((sub) => {
              qbOr.orWhere(
                new Brackets((qbSub) => {
                  applyFilters(qbSub as any, target, alias, sub);
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
                  applyFilters(qbSub as any, target, alias, sub);
                }),
              );
            });
          }),
        );
        break;

      case '$not':
        qb.andWhere(
          new Brackets((qbNot) => {
            applyFilters(qbNot as any, target, alias, value as Filter);
          }),
        );
        const last = qb.expressionMap.wheres.at(-1);
        if (last) {
          last.condition = `NOT (${last.condition})`;
        }
        break;

      default:
        applyCondition(qb, target, alias, key, value);
    }
  });

  return qb;
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

function applyCondition<T extends ObjectLiteral>(
  qb: SelectQueryBuilder<T>,
  target: EntityTarget<T>,
  alias: string,
  path: string,
  value: any,
) {
  const parsed = transformValue(value);

  if (path.includes('.')) {
    applyRelationCondition(qb, target, alias, path, parsed);
  } else {
    applySimpleCondition(qb, alias, path, parsed);
  }
}

function transformValue(value: any) {
  if (value === null) return { $null: true };
  if (!(typeof value === 'object' && !Array.isArray(value))) {
    return { $eq: value };
  }
  return value;
}

/* =========================
 * Simple fields
 * ========================= */

function applySimpleCondition<T extends ObjectLiteral>(
  qb: SelectQueryBuilder<T>,
  alias: string,
  field: string,
  value: any,
) {
  Object.entries(value).forEach(([operator, expected]) => {
    const path = `${alias}.${field}`;
    const { condition, params } = generateSqlForOperator(
      field,
      path,
      operator as Operator,
      expected,
    );
    qb.andWhere(condition, params);
  });
}

/* =========================
 * Relations
 * ========================= */

function applyRelationCondition<T extends ObjectLiteral>(
  qb: SelectQueryBuilder<T>,
  target: EntityTarget<T>,
  alias: string,
  path: string,
  value: any,
) {
  const [relation, field] = path.split('.');
  const metadata = qb.connection.getMetadata(target);
  const relationMetadata = metadata.findRelationWithPropertyPath(relation);

  if (!relationMetadata) return;

  // OneToOne / ManyToOne
  if (relationMetadata.isOneToOne || relationMetadata.isManyToOne) {
    applyToOneRelation(qb, alias, relation, field, value);
    return;
  }

  // OneToMany / ManyToMany
  applyToManyRelation(qb, metadata, alias, relation, field, value);
}

function applyToOneRelation<T extends ObjectLiteral>(
  qb: SelectQueryBuilder<T>,
  alias: string,
  relation: string,
  field: string,
  value: any,
) {
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
    );
    qb.andWhere(condition, params);
  });
}

function applyToManyRelation<T extends ObjectLiteral>(
  qb: SelectQueryBuilder<T>,
  metadata: any,
  alias: string,
  relation: string,
  field: string,
  value: any,
) {
  const relationMetadata = metadata.findRelationWithPropertyPath(relation);
  if (!relationMetadata) return;

  const targetAlias = `${alias}_sub`;
  const relationAlias = `${relation}_sub`;

  const joinTable = relationMetadata.joinTableName;
  const joinColumn =
    relationMetadata.joinColumns?.[0]?.databaseName ||
    `${metadata.tableName}Id`;
  const inverseJoinColumn =
    relationMetadata.inverseJoinColumns?.[0]?.databaseName ||
    `${relationMetadata.inverseEntityMetadata.tableName}Id`;

  Object.entries(value).forEach(([operator, expected]) => {
    const path = `"${relationAlias}"."${field}"`;

    const { condition, params } = generateSqlForOperator(
      field,
      path,
      operator as Operator,
      expected,
    );

    qb.andWhere(
      `"${alias}"."id" IN (
        SELECT "${targetAlias}"."id"
        FROM "${metadata.tableName}" "${targetAlias}"
        JOIN "${joinTable}" "${relation}_join"
          ON "${relation}_join"."${joinColumn}" = "${targetAlias}"."id"
        JOIN "${relationMetadata.inverseEntityMetadata.tableName}" "${relationAlias}"
          ON "${relationAlias}"."id" = "${relation}_join"."${inverseJoinColumn}"
        WHERE ${condition}
      )`,
      params,
    );
  });
}

/* =========================
 * SQL operators
 * ========================= */

function generateSqlForOperator(
  field: string,
  path: string,
  operator: Operator,
  expectedValue: any,
): { condition: string; params: Record<string, any> } {
  let condition = '';
  let params: Record<string, any> = {};

  switch (operator) {
    case '$eq':
      condition = `${path} = :${field}`;
      params[field] = expectedValue;
      break;

    case '$ne':
      condition = `${path} != :${field}`;
      params[field] = expectedValue;
      break;

    case '$gt':
      condition = `${path} > :${field}`;
      params[field] = expectedValue;
      break;

    case '$gte':
      condition = `${path} >= :${field}`;
      params[field] = expectedValue;
      break;

    case '$lt':
      condition = `${path} < :${field}`;
      params[field] = expectedValue;
      break;

    case '$lte':
      condition = `${path} <= :${field}`;
      params[field] = expectedValue;
      break;

    case '$in':
      condition = `${path} IN (:...${field})`;
      params[field] = expectedValue;
      break;

    case '$nin':
      condition = `${path} NOT IN (:...${field})`;
      params[field] = expectedValue;
      break;

    case '$like':
      condition = `${path} LIKE :${field}`;
      params[field] = expectedValue;
      break;

    case '$ilike':
      condition = `${path} ILIKE :${field}`;
      params[field] = expectedValue;
      break;

    case '$null':
      condition = expectedValue ? `${path} IS NULL` : `${path} IS NOT NULL`;
      break;

    case '$between':
      condition = `${path} BETWEEN :start AND :end`;
      params = { start: expectedValue[0], end: expectedValue[1] };
      break;

    case '$contains':
      condition = `${path} @> :${field}`;
      params[field] = expectedValue;
      break;

    case '$contained':
      condition = `${path} <@ :${field}`;
      params[field] = expectedValue;
      break;

    case '$overlap':
      condition = `${path} && :${field}`;
      params[field] = expectedValue;
      break;

    case '$startsWith':
      condition = `${path} LIKE :${field}`;
      params[field] = `${expectedValue}%`;
      break;

    case '$endsWith':
      condition = `${path} LIKE :${field}`;
      params[field] = `%${expectedValue}`;
      break;

    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }

  return { condition, params };
}
