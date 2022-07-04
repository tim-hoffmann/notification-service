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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateController = void 0;
const common_1 = require("@nestjs/common");
const create_template_locale_dto_1 = require("../../application/dtos/create-template-locale.dto");
const create_template_dto_1 = require("../../application/dtos/create-template.dto");
const pagination_query_dto_1 = require("../../application/dtos/pagination-query.dto");
const patch_template_dto_1 = require("../../application/dtos/patch-template.dto");
const template_service_1 = require("../../application/services/template.service");
let TemplateController = class TemplateController {
    constructor(templateService) {
        this.templateService = templateService;
    }
    async create(tenantId, dto) {
        return this.templateService.create(tenantId, dto);
    }
    async findOne(tenantId, id, locale) {
        return this.templateService.findOne(tenantId, id, locale);
    }
    async find(tenantId, { first, before, after }) {
        return this.templateService.find(tenantId, first, before, after);
    }
    async patch(tenantId, id, dto, locale) {
        return this.templateService.patch(tenantId, id, dto, locale);
    }
    async delete(tenantId, id, locale) {
        return this.templateService.delete(tenantId, id, locale);
    }
    async createLocale(tenantId, id, dto) {
        return this.templateService.createLocale(tenantId, id, dto);
    }
    async findLocales(tenantId, id) {
        return this.templateService.findLocales(tenantId, id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('tenantId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_template_dto_1.CreateTemplateDto]),
    __metadata("design:returntype", Promise)
], TemplateController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('tenantId')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Query)('locale')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], TemplateController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('tenantId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pagination_query_dto_1.PaginationQueryDto]),
    __metadata("design:returntype", Promise)
], TemplateController.prototype, "find", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('tenantId')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Query)('locale')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, patch_template_dto_1.PatchTemplateDto, String]),
    __metadata("design:returntype", Promise)
], TemplateController.prototype, "patch", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('tenantId')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Query)('locale')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], TemplateController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)(':id/locales'),
    __param(0, (0, common_1.Param)('tenantId')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, create_template_locale_dto_1.CreateTemplateLocaleDto]),
    __metadata("design:returntype", Promise)
], TemplateController.prototype, "createLocale", null);
__decorate([
    (0, common_1.Get)(':id/locales'),
    __param(0, (0, common_1.Param)('tenantId')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TemplateController.prototype, "findLocales", null);
TemplateController = __decorate([
    (0, common_1.Controller)(':tenantId/templates'),
    __metadata("design:paramtypes", [template_service_1.TemplateService])
], TemplateController);
exports.TemplateController = TemplateController;
//# sourceMappingURL=template.controller.js.map