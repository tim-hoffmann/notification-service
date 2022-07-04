"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('web', () => {
    var _a;
    return ({
        enableLogRequestDetails: [true, 'true', 1, '1'].includes((_a = process.env.ENABLE_LOG_REQUEST_DETAILS) !== null && _a !== void 0 ? _a : false),
    });
});
//# sourceMappingURL=web.config.js.map