"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var RequestLoggerMiddleware_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestLoggerMiddleware = void 0;
const common_1 = require("@nestjs/common");
const web_config_1 = require("../web.config");
let RequestLoggerMiddleware = RequestLoggerMiddleware_1 = class RequestLoggerMiddleware {
    constructor(config) {
        this.config = config;
        this.logger = new common_1.Logger(RequestLoggerMiddleware_1.name);
    }
    use(request, response, next) {
        const startAt = new Date().getTime();
        const { method, originalUrl, headers, body, query } = request;
        const userAgent = request.get('user-agent') || '';
        response.on('finish', () => {
            const { statusCode: status } = response;
            const contentLength = response.get('content-length');
            const endAt = new Date().getTime();
            const duration = endAt - startAt;
            const message = this.config.enableLogRequestDetails
                ? JSON.stringify({
                    method,
                    url: originalUrl,
                    status,
                    contentLength,
                    duration,
                    headers,
                    body,
                    query,
                }, undefined, 2)
                : `${method} ${originalUrl} ${status} ${contentLength} ${duration}ms - ${userAgent}`;
            this.logger.debug(message);
        });
        next();
    }
};
RequestLoggerMiddleware = RequestLoggerMiddleware_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(web_config_1.default.KEY)),
    __metadata("design:paramtypes", [void 0])
], RequestLoggerMiddleware);
exports.RequestLoggerMiddleware = RequestLoggerMiddleware;
//# sourceMappingURL=request-logger.middleware.js.map