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
exports.TemplateLocaleProfile = void 0;
const nestjs_1 = require("@automapper/nestjs");
const core_1 = require("@automapper/core");
const common_1 = require("@nestjs/common");
const model_type_enum_1 = require("../../enums/model-type.enum");
const template_locale_model_1 = require("../../models/template-locale.model");
const template_entity_1 = require("../../../../core/entities/template.entity");
const template_locale_entity_1 = require("../../../../core/entities/template-locale.entity");
let TemplateLocaleProfile = class TemplateLocaleProfile extends nestjs_1.AutomapperProfile {
    constructor(mapper) {
        super(mapper);
    }
    get profile() {
        return (mapper) => {
            (0, core_1.createMap)(mapper, template_entity_1.Template, template_locale_model_1.TemplateLocaleModel, (0, core_1.forMember)((dst) => dst.type, (0, core_1.fromValue)(model_type_enum_1.ModelType.TEMPLATE_LOCALE)), (0, core_1.forMember)((dst) => dst.itemKey, (0, core_1.mapWithArguments)((src, { id, locale }) => `${id !== null && id !== void 0 ? id : src.id}#${model_type_enum_1.ModelType.TEMPLATE_LOCALE}#${locale}`)), (0, core_1.forMember)((dst) => dst.gsiSortKey, (0, core_1.fromValue)(undefined)), (0, core_1.forMember)((dst) => dst.id, (0, core_1.mapWithArguments)((src, { id }) => id !== null && id !== void 0 ? id : src.id)), (0, core_1.forMember)((dst) => dst.createdAt, (0, core_1.mapWithArguments)((src, { createdAt }) => createdAt !== null && createdAt !== void 0 ? createdAt : src.createdAt)), (0, core_1.forMember)((dst) => dst.updatedAt, (0, core_1.mapWithArguments)((src, { updatedAt }) => updatedAt !== null && updatedAt !== void 0 ? updatedAt : src.updatedAt)), (0, core_1.forMember)((dst) => dst.textTemplate, (0, core_1.mapWithArguments)((src, { localeFields }) => {
                var _a;
                return localeFields
                    ? localeFields === null || localeFields === void 0 ? void 0 : localeFields.textTemplate
                    : (_a = src.localeFields) === null || _a === void 0 ? void 0 : _a.textTemplate;
            })), (0, core_1.forMember)((dst) => dst.subjectTemplate, (0, core_1.mapWithArguments)((src, { localeFields }) => {
                var _a;
                return localeFields
                    ? localeFields === null || localeFields === void 0 ? void 0 : localeFields.subjectTemplate
                    : (_a = src.localeFields) === null || _a === void 0 ? void 0 : _a.subjectTemplate;
            })), (0, core_1.forMember)((dst) => dst.htmlTemplate, (0, core_1.mapWithArguments)((src, { localeFields }) => {
                var _a;
                return localeFields
                    ? localeFields === null || localeFields === void 0 ? void 0 : localeFields.htmlTemplate
                    : (_a = src.localeFields) === null || _a === void 0 ? void 0 : _a.htmlTemplate;
            })), (0, core_1.forMember)((dst) => dst.locale, (0, core_1.mapWithArguments)((src, { locale }) => locale)));
            (0, core_1.createMap)(mapper, template_locale_model_1.TemplateLocaleModel, template_locale_entity_1.TemplateLocale);
            (0, core_1.createMap)(mapper, template_locale_model_1.TemplateLocaleModel, template_entity_1.Template, (0, core_1.forMember)((dst) => dst.createdAt, (0, core_1.mapFrom)((src) => new Date(src.createdAt))), (0, core_1.forMember)((dst) => dst.updatedAt, (0, core_1.mapFrom)((src) => new Date(src.updatedAt))), (0, core_1.forMember)((dst) => dst.localeFields, (0, core_1.mapFrom)((src) => mapper.map(src, template_locale_model_1.TemplateLocaleModel, template_locale_entity_1.TemplateLocale))));
            (0, core_1.createMap)(mapper, template_locale_entity_1.TemplateLocale, template_locale_model_1.TemplateLocaleModel, (0, core_1.forMember)((dst) => dst.id, (0, core_1.mapWithArguments)((src, { id }) => id)), (0, core_1.forMember)((dst) => dst.tenantId, (0, core_1.mapWithArguments)((_, { tenantId }) => tenantId)), (0, core_1.forMember)((dst) => dst.type, (0, core_1.fromValue)(model_type_enum_1.ModelType.TEMPLATE_LOCALE)), (0, core_1.forMember)((dst) => dst.itemKey, (0, core_1.mapWithArguments)((_, { id, locale }) => `${id}#${model_type_enum_1.ModelType.TEMPLATE_LOCALE}#${locale}`)), (0, core_1.forMember)((dst) => dst.gsiSortKey, (0, core_1.fromValue)(undefined)), (0, core_1.forMember)((dst) => dst.createdAt, (0, core_1.mapWithArguments)((_, { createdAt }) => createdAt)), (0, core_1.forMember)((dst) => dst.updatedAt, (0, core_1.mapWithArguments)((_, { updatedAt }) => updatedAt)), (0, core_1.forMember)((dst) => dst.name, (0, core_1.mapWithArguments)((_, { name }) => name)), (0, core_1.forMember)((dst) => dst.from, (0, core_1.mapWithArguments)((_, { from }) => from)), (0, core_1.forMember)((dst) => dst.transportType, (0, core_1.mapWithArguments)((_, { transportType }) => transportType)), (0, core_1.forMember)((dst) => dst.dataSchema, (0, core_1.mapWithArguments)((_, { dataSchema }) => dataSchema)), (0, core_1.forMember)((dst) => dst.bcc, (0, core_1.mapWithArguments)((_, { bcc }) => bcc)));
        };
    }
};
TemplateLocaleProfile = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [Object])
], TemplateLocaleProfile);
exports.TemplateLocaleProfile = TemplateLocaleProfile;
//# sourceMappingURL=template-locale.profile.js.map