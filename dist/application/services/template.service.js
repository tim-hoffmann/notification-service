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
exports.TemplateService = void 0;
const nestjs_1 = require("@automapper/nestjs");
const common_1 = require("@nestjs/common");
const di_tokens_constant_1 = require("../../core/constants/di-tokens.constant");
const template_locale_entity_1 = require("../../core/entities/template-locale.entity");
const template_entity_1 = require("../../core/entities/template.entity");
const application_config_1 = require("../application.config");
const create_template_locale_dto_1 = require("../dtos/create-template-locale.dto");
const create_template_dto_1 = require("../dtos/create-template.dto");
const patch_template_dto_1 = require("../dtos/patch-template.dto");
const read_template_locale_dto_1 = require("../dtos/read-template-locale.dto");
const read_template_dto_1 = require("../dtos/read-template.dto");
let TemplateService = class TemplateService {
    constructor(templateRepository, config, mapper) {
        this.templateRepository = templateRepository;
        this.config = config;
        this.mapper = mapper;
        this.defaultLocale = config.defaultLocale;
    }
    async create(tenantId, dto) {
        const entity = this.mapper.map(dto, create_template_dto_1.CreateTemplateDto, template_entity_1.Template, {
            extraArgs: () => ({ tenantId, locale: this.defaultLocale }),
        });
        const createdEntity = await this.templateRepository.create(entity);
        const readDto = this.mapper.map(createdEntity, template_entity_1.Template, read_template_dto_1.ReadTemplateDto);
        return readDto;
    }
    async createLocale(tenantId, id, dto) {
        if (!(await this.templateRepository.exists(tenantId, id))) {
            throw new common_1.NotFoundException(`Template not found`);
        }
        if (await this.templateRepository.exists(tenantId, id, dto.locale)) {
            throw new common_1.BadRequestException(`Template with locale already exists: ${dto.locale}`);
        }
        const entity = this.mapper.map(dto, create_template_locale_dto_1.CreateTemplateLocaleDto, template_locale_entity_1.TemplateLocale, {
            extraArgs: () => ({ tenantId, id }),
        });
        const createdEntity = await this.templateRepository.createLocale(tenantId, id, entity);
        const readDto = this.mapper.map(createdEntity, template_locale_entity_1.TemplateLocale, read_template_locale_dto_1.ReadTemplateLocaleDto);
        return readDto;
    }
    async findOne(tenantId, id, locale = this.defaultLocale) {
        const entity = await this.templateRepository.findOne(tenantId, id, locale);
        const dto = this.mapper.map(entity, template_entity_1.Template, read_template_dto_1.ReadTemplateDto);
        return dto;
    }
    async findLocales(tenantId, id) {
        const locales = await this.templateRepository.findLocales(tenantId, id);
        if (locales.length <= 0) {
            throw new common_1.NotFoundException();
        }
        return locales;
    }
    async find(tenantId, first = 100, before, after) {
        const result = await this.templateRepository.find(tenantId, first, before, after);
        const dtos = this.mapper.mapArray(result.items, template_entity_1.Template, read_template_dto_1.ReadTemplateDto);
        return Object.assign(Object.assign({}, result), { items: dtos });
    }
    async patch(tenantId, id, dto, locale = this.defaultLocale) {
        const partialEntity = this.mapper.map(dto, patch_template_dto_1.PatchTemplateDto, template_entity_1.Template, {
            extraArgs: () => ({ tenantId, locale }),
        });
        const patchedEntity = await this.templateRepository.update(tenantId, id, locale, partialEntity);
        const readDto = this.mapper.map(patchedEntity, template_entity_1.Template, read_template_dto_1.ReadTemplateDto);
        return readDto;
    }
    async delete(tenantId, id, locale) {
        await this.templateRepository.delete(tenantId, id, locale);
    }
};
TemplateService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(di_tokens_constant_1.TEMPLATE_REPOSITORY)),
    __param(1, (0, common_1.Inject)(application_config_1.default.KEY)),
    __param(2, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [Object, void 0, Object])
], TemplateService);
exports.TemplateService = TemplateService;
//# sourceMappingURL=template.service.js.map