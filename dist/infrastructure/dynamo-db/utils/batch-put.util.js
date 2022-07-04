"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.batchPut = void 0;
const batchPut = async (db, tableName, items) => {
    const promises = [];
    for (let i = 0; i < items.length; i += 25) {
        promises.push(db.batchWrite({
            RequestItems: {
                [tableName]: [...items.slice(i, i + 25)].map((Item) => ({ PutRequest: { Item } })),
            },
        }));
    }
    return await Promise.all(promises);
};
exports.batchPut = batchPut;
//# sourceMappingURL=batch-put.util.js.map