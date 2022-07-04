"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AjvSchemaValidationModule = void 0;
const common_1 = require("@nestjs/common");
const ajv_1 = require("ajv");
const schema_validation_service_interface_1 = require("../../core/services/schema-validation-service.interface");
const ajv_schema_validation_service_1 = require("./services/ajv-schema-validation.service");
let AjvSchemaValidationModule = class AjvSchemaValidationModule {
};
AjvSchemaValidationModule = __decorate([
    (0, common_1.Module)({
        providers: [{ provide: schema_validation_service_interface_1.SchemaValidationService, useClass: ajv_schema_validation_service_1.AjvSchemaValidationService }, ajv_1.default],
    })
], AjvSchemaValidationModule);
exports.AjvSchemaValidationModule = AjvSchemaValidationModule;
//# sourceMappingURL=ajv-schema-validation.module.js.map