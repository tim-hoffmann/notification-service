"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('dynamoDb', () => {
    var _a;
    return ({
        region: process.env.AWS_REGION,
        endpoint: process.env.DYNAMO_DB_ENDPOINT,
        tableName: (_a = process.env.DYNAMO_DB_TABLE) !== null && _a !== void 0 ? _a : 'notification-service',
    });
});
//# sourceMappingURL=dynamo-db.config.js.map