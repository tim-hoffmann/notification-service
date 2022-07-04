"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.batchDelete = void 0;
const batchDelete = async (db, tableName, keys) => {
    const promises = [];
    for (let i = 0; i < keys.length; i += 25) {
        promises.push(db.batchWrite({
            RequestItems: {
                [tableName]: [...keys.slice(i, i + 25)].map((Key) => ({ DeleteRequest: { Key } })),
            },
        }));
    }
    return await Promise.all(promises);
};
exports.batchDelete = batchDelete;
//# sourceMappingURL=batch-delete.util.js.map