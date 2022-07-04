"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('application', () => {
    var _a;
    return ({
        defaultLocale: (_a = process.env.ENABLE_LOG_REQUEST_DETAILS) !== null && _a !== void 0 ? _a : 'en-US',
    });
});
//# sourceMappingURL=application.config.js.map