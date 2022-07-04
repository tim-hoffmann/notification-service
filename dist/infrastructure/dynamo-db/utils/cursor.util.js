"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCursor = exports.createCursor = exports.createNextCursor = exports.createPrevCursor = void 0;
const CURSOR_KEYS = ['tenantId', 'itemKey', 'gsiSortKey'];
const createPrevCursor = (models, afterCursor, beforeCursor, lastEvaluatedKey) => {
    return afterCursor
        ? (0, exports.createCursor)(models[0])
        : beforeCursor && lastEvaluatedKey
            ? (0, exports.createCursor)(models[0])
            : undefined;
};
exports.createPrevCursor = createPrevCursor;
const createNextCursor = (models, beforeCursor, limit, lastEvaluatedKey) => {
    return beforeCursor
        ? (0, exports.createCursor)(models[limit - 1])
        : lastEvaluatedKey
            ? (0, exports.createCursor)(models[limit - 1])
            : undefined;
};
exports.createNextCursor = createNextCursor;
const createCursor = (model, cursorKeys = CURSOR_KEYS) => {
    const cursorArr = createCursorArray(model, cursorKeys);
    const cursor = JSON.stringify(cursorArr);
    return Buffer.from(cursor).toString('base64');
};
exports.createCursor = createCursor;
const parseCursor = (cursor) => {
    if (!cursor) {
        return undefined;
    }
    const cursorString = Buffer.from(cursor, 'base64').toString();
    const cursorArray = JSON.parse(cursorString);
    if (!Array.isArray(cursorArray)) {
        return undefined;
    }
    const cursorObj = cursorArray.reduce((p, c, i) => (Object.assign(Object.assign({}, p), { [CURSOR_KEYS[i]]: c })), {});
    return cursorObj;
};
exports.parseCursor = parseCursor;
const createCursorArray = (model, cursorKeys) => Object.keys(model)
    .filter((k) => cursorKeys.includes(k))
    .sort((a, b) => CURSOR_KEYS.indexOf(a) - CURSOR_KEYS.indexOf(b))
    .map((k) => model[k]);
//# sourceMappingURL=cursor.util.js.map