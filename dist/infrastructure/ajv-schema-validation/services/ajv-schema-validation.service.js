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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AjvSchemaValidationService = void 0;
const common_1 = require("@nestjs/common");
const ajv_1 = require("ajv");
let AjvSchemaValidationService = class AjvSchemaValidationService {
    constructor(ajv) {
        this.ajv = ajv;
    }
    async validateData(schema, data) {
        const parsedSchema = this.parseSchema(schema);
        if (!this.parseSchema) {
            return { success: false, error: 'SCHEMA_PARSE_FAILED' };
        }
        const valid = await this.ajv.validate(parsedSchema, data);
        return {
            success: valid,
            error: !valid ? 'DATA_INVALID' : undefined,
        };
    }
    async validateSchema(schema) {
        const parsedSchema = this.parseSchema(schema);
        if (!this.parseSchema) {
            return { success: false, error: 'SCHEMA_PARSE_FAILED' };
        }
        let valid;
        try {
            valid = await this.ajv.validateSchema(parsedSchema);
        }
        catch (ex) {
            return { success: false, error: 'SCHEMA_INVALID' };
        }
        return {
            success: valid ? true : false,
            error: !valid ? 'SCHEMA_INVALID' : undefined,
        };
    }
    parseSchema(schema) {
        try {
            return JSON.parse(schema);
        }
        catch (_a) {
            return;
        }
    }
};
AjvSchemaValidationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [ajv_1.default])
], AjvSchemaValidationService);
exports.AjvSchemaValidationService = AjvSchemaValidationService;
//# sourceMappingURL=ajv-schema-validation.service.js.map