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
exports.TemplateProfile = void 0;
const nestjs_1 = require("@automapper/nestjs");
const core_1 = require("@automapper/core");
const common_1 = require("@nestjs/common");
const template_entity_1 = require("../../../core/entities/template.entity");
const read_template_dto_1 = require("../../dtos/read-template.dto");
const create_template_dto_1 = require("../../dtos/create-template.dto");
const template_locale_entity_1 = require("../../../core/entities/template-locale.entity");
const patch_template_dto_1 = require("../../dtos/patch-template.dto");
let TemplateProfile = class TemplateProfile extends nestjs_1.AutomapperProfile {
    constructor(mapper) {
        super(mapper);
    }
    get profile() {
        return (mapper) => {
            (0, core_1.createMap)(mapper, create_template_dto_1.CreateTemplateDto, template_entity_1.Template, (0, core_1.forMember)((dst) => dst.tenantId, (0, core_1.mapWithArguments)((_, { tenantId }) => tenantId)), (0, core_1.forMember)((dst) => dst.id, (0, core_1.ignore)()), (0, core_1.forMember)((dst) => dst.createdAt, (0, core_1.ignore)()), (0, core_1.forMember)((dst) => dst.updatedAt, (0, core_1.ignore)()), (0, core_1.forMember)((dst) => dst.localeFields, (0, core_1.mapWithArguments)((src, { locale }) => mapper.map(src, create_template_dto_1.CreateTemplateDto, template_locale_entity_1.TemplateLocale, {
                extraArgs: () => ({ locale }),
            }))));
            (0, core_1.createMap)(mapper, patch_template_dto_1.PatchTemplateDto, template_entity_1.Template, (0, core_1.forMember)((dst) => dst.tenantId, (0, core_1.mapWithArguments)((_, { tenantId }) => tenantId)), (0, core_1.forMember)((dst) => dst.id, (0, core_1.ignore)()), (0, core_1.forMember)((dst) => dst.createdAt, (0, core_1.ignore)()), (0, core_1.forMember)((dst) => dst.updatedAt, (0, core_1.ignore)()), (0, core_1.forMember)((dst) => dst.localeFields, (0, core_1.mapWithArguments)((src, { locale }) => mapper.map(src, patch_template_dto_1.PatchTemplateDto, template_locale_entity_1.TemplateLocale, {
                extraArgs: () => ({ locale }),
            }))));
            (0, core_1.createMap)(mapper, template_entity_1.Template, read_template_dto_1.ReadTemplateDto, (0, core_1.forMember)((dst) => dst.htmlTemplate, (0, core_1.mapFrom)((src) => { var _a; return (_a = src.localeFields) === null || _a === void 0 ? void 0 : _a.htmlTemplate; })), (0, core_1.forMember)((dst) => dst.textTemplate, (0, core_1.mapFrom)((src) => { var _a; return (_a = src.localeFields) === null || _a === void 0 ? void 0 : _a.textTemplate; })), (0, core_1.forMember)((dst) => dst.subjectTemplate, (0, core_1.mapFrom)((src) => { var _a; return (_a = src.localeFields) === null || _a === void 0 ? void 0 : _a.subjectTemplate; })), (0, core_1.forMember)((dst) => dst.locale, (0, core_1.mapFrom)((src) => { var _a; return (_a = src.localeFields) === null || _a === void 0 ? void 0 : _a.locale; })));
        };
    }
};
TemplateProfile = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [Object])
], TemplateProfile);
exports.TemplateProfile = TemplateProfile;
//# sourceMappingURL=template.profile.js.map