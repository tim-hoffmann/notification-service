import { BaseModel } from '../models/base.model';

const CURSOR_KEYS: (keyof BaseModel)[] = ['tenantId', 'itemKey', 'gsiSortKey'];

type Model = { [key: string]: any };

export const createPrevCursor = (
  models: Model[],
  afterCursor: Model,
  beforeCursor: Model,
  lastEvaluatedKey?: Model,
) => {
  return afterCursor
    ? createCursor(models[0])
    : beforeCursor && lastEvaluatedKey
    ? createCursor(models[0])
    : undefined;
};

export const createNextCursor = (
  models: Model[],
  beforeCursor: Model,
  limit: number,
  lastEvaluatedKey?: Model,
) => {
  return beforeCursor
    ? createCursor(models[limit - 1])
    : lastEvaluatedKey
    ? createCursor(models[limit - 1])
    : undefined;
};

export const createCursor = <T extends Model>(
  model: T,
  cursorKeys: (keyof T)[] = CURSOR_KEYS,
): string => {
  const cursorArr = createCursorArray(model, cursorKeys);
  const cursor = JSON.stringify(cursorArr);

  return Buffer.from(cursor).toString('base64');
};

export const parseCursor = <T extends Model>(cursor?: string): T | undefined => {
  if (!cursor) {
    return undefined;
  }

  const cursorString = Buffer.from(cursor, 'base64').toString();
  const cursorArray = JSON.parse(cursorString);

  if (!Array.isArray(cursorArray)) {
    return undefined;
  }

  const cursorObj = cursorArray.reduce((p, c, i) => ({ ...p, [CURSOR_KEYS[i]]: c }), {});

  return cursorObj;
};

const createCursorArray = <T extends Model>(model: T, cursorKeys: (keyof T)[]): unknown[] =>
  Object.keys(model)
    .filter((k) => cursorKeys.includes(k))
    .sort((a: any, b: any) => CURSOR_KEYS.indexOf(a) - CURSOR_KEYS.indexOf(b))
    .map((k) => model[k]);
