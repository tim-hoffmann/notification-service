"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityNotFoundExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const entity_not_found_exception_1 = require("../../core/exceptions/entity-not-found.exception");
let EntityNotFoundExceptionFilter = class EntityNotFoundExceptionFilter {
    catch(_, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        response.status(common_1.HttpStatus.NOT_FOUND).json({
            statusCode: common_1.HttpStatus.NOT_FOUND,
            message: 'Not Found',
        });
    }
};
EntityNotFoundExceptionFilter = __decorate([
    (0, common_1.Catch)(entity_not_found_exception_1.EntityNotFoundException)
], EntityNotFoundExceptionFilter);
exports.EntityNotFoundExceptionFilter = EntityNotFoundExceptionFilter;
//# sourceMappingURL=entity-not-found.filter.js.map