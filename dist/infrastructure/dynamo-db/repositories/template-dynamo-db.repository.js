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
exports.TemplateDynamoDbRepository = void 0;
const nestjs_1 = require("@automapper/nestjs");
const common_1 = require("@nestjs/common");
const di_tokens_constant_1 = require("../../../core/constants/di-tokens.constant");
const template_entity_1 = require("../../../core/entities/template.entity");
const model_type_enum_1 = require("../enums/model-type.enum");
const template_locale_model_1 = require("../models/template-locale.model");
const template_model_1 = require("../models/template.model");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const date_util_1 = require("../../../core/utils/date.util");
const batch_put_util_1 = require("../utils/batch-put.util");
const entity_not_found_exception_1 = require("../../../core/exceptions/entity-not-found.exception");
const template_locale_entity_1 = require("../../../core/entities/template-locale.entity");
const indexes_constant_1 = require("../constants/indexes.constant");
const cursor_util_1 = require("../utils/cursor.util");
const batch_delete_util_1 = require("../utils/batch-delete.util");
const dynamo_db_config_1 = require("../dynamo-db.config");
let TemplateDynamoDbRepository = class TemplateDynamoDbRepository {
    constructor(mapper, uniqueIdService, db, config) {
        this.mapper = mapper;
        this.uniqueIdService = uniqueIdService;
        this.db = db;
        this.tableName = config.tableName;
    }
    async create(entity) {
        const id = await this.uniqueIdService.generate();
        const now = (0, date_util_1.getDateString)();
        const opts = {
            extraArgs: () => ({ createdAt: now, updatedAt: now, id }),
        };
        const templateModel = this.mapper.map(entity, template_entity_1.Template, template_model_1.TemplateModel, opts);
        const templateLocaleModel = this.mapper.map(entity, template_entity_1.Template, template_locale_model_1.TemplateLocaleModel, opts);
        await (0, batch_put_util_1.batchPut)(this.db, this.tableName, [templateModel, templateLocaleModel]);
        const createdEntity = this.mapper.map(templateLocaleModel, template_locale_model_1.TemplateLocaleModel, template_entity_1.Template);
        return createdEntity;
    }
    async createLocale(tenantId, id, entity) {
        const now = (0, date_util_1.getDateString)();
        const { Item: templateModel } = await this.db.get({
            TableName: this.tableName,
            Key: {
                tenantId,
                itemKey: `${id}#TEMPLATE#`,
            },
        });
        const templateLocaleModel = this.mapper.map(entity, template_locale_entity_1.TemplateLocale, template_locale_model_1.TemplateLocaleModel, {
            extraArgs: () => (Object.assign(Object.assign({}, templateModel), { createdAt: now, updatedAt: now, id })),
        });
        await this.db.put({ TableName: this.tableName, Item: templateLocaleModel });
        return entity;
    }
    async find(tenantId, first, before, after) {
        const cursor = (0, cursor_util_1.parseCursor)(before !== null && before !== void 0 ? before : after);
        const { Items: models, LastEvaluatedKey } = await this.db.query({
            TableName: this.tableName,
            IndexName: indexes_constant_1.READ_ALL_INDEX,
            Limit: first + 1,
            ExclusiveStartKey: cursor,
            ScanIndexForward: !!before,
            ExpressionAttributeValues: {
                ':tenantId': tenantId,
                ':gsiSortKey': `${model_type_enum_1.ModelType.TEMPLATE}#`,
            },
            ExpressionAttributeNames: {
                '#tenantId': 'tenantId',
                '#gsiSortKey': 'gsiSortKey',
            },
            KeyConditionExpression: '#tenantId = :tenantId and begins_with(#gsiSortKey, :gsiSortKey)',
        });
        if (!models) {
            return { items: [] };
        }
        const entities = this.mapper.mapArray(models.slice(0, first), template_model_1.TemplateModel, template_entity_1.Template);
        const startCursor = (0, cursor_util_1.createPrevCursor)(models, after, before, LastEvaluatedKey);
        const endCursor = (0, cursor_util_1.createNextCursor)(models, before, first, LastEvaluatedKey);
        return {
            items: entities,
            startCursor,
            endCursor,
            hasPreviousPage: !!startCursor,
            hasNextPage: !!endCursor,
        };
    }
    async findOne(tenantId, id, locale) {
        const { Item: model } = await this.db.get({
            TableName: this.tableName,
            Key: {
                tenantId,
                itemKey: `${id}#${model_type_enum_1.ModelType.TEMPLATE_LOCALE}#${locale}`,
            },
        });
        if (!model) {
            throw new entity_not_found_exception_1.EntityNotFoundException();
        }
        const entity = this.mapper.map(model, template_locale_model_1.TemplateLocaleModel, template_entity_1.Template);
        return entity;
    }
    async findLocales(tenantId, id) {
        var _a;
        const { Items } = await this.db.query({
            TableName: this.tableName,
            ExpressionAttributeValues: {
                ':tenantId': tenantId,
                ':itemKey': `${id}#${model_type_enum_1.ModelType.TEMPLATE_LOCALE}#`,
            },
            ExpressionAttributeNames: {
                '#tenantId': 'tenantId',
                '#itemKey': 'itemKey',
            },
            KeyConditionExpression: '#tenantId = :tenantId and begins_with(#itemKey, :itemKey)',
        });
        const locales = (_a = Items === null || Items === void 0 ? void 0 : Items.map((i) => i.locale)) !== null && _a !== void 0 ? _a : [];
        return locales;
    }
    async update(tenantId, id, locale, update) {
        const { Items: models } = await this.db.query({
            TableName: this.tableName,
            ExpressionAttributeValues: {
                ':tenantId': tenantId,
                ':itemKey': `${id}#`,
            },
            ExpressionAttributeNames: {
                '#tenantId': 'tenantId',
                '#itemKey': 'itemKey',
            },
            KeyConditionExpression: '#tenantId = :tenantId and begins_with(#itemKey, :itemKey)',
        });
        const templateModel = models === null || models === void 0 ? void 0 : models.find((m) => m.type === model_type_enum_1.ModelType.TEMPLATE);
        const templateLocaleModelToUpdate = models === null || models === void 0 ? void 0 : models.find((m) => m.locale === locale);
        const otherTemplateLocaleModels = models === null || models === void 0 ? void 0 : models.filter((m) => m.type === model_type_enum_1.ModelType.TEMPLATE_LOCALE && m.locale !== locale);
        if (!(models === null || models === void 0 ? void 0 : models.length) ||
            !templateModel ||
            !otherTemplateLocaleModels ||
            !templateLocaleModelToUpdate) {
            throw new entity_not_found_exception_1.EntityNotFoundException();
        }
        const now = (0, date_util_1.getDateString)();
        this.mapper.mutate(update, templateModel, template_entity_1.Template, template_model_1.TemplateModel, {
            extraArgs: () => ({ updatedAt: now, id }),
        });
        this.mapper.mutate(update, templateLocaleModelToUpdate, template_entity_1.Template, template_locale_model_1.TemplateLocaleModel, {
            extraArgs: () => ({ updatedAt: now, id, locale }),
        });
        otherTemplateLocaleModels.forEach((_, i) => this.mapper.mutate(update, otherTemplateLocaleModels[i], template_entity_1.Template, template_locale_model_1.TemplateLocaleModel, {
            extraArgs: () => ({
                localeFields: otherTemplateLocaleModels[i],
                updatedAt: now,
                id,
                locale: otherTemplateLocaleModels[i].locale,
            }),
        }));
        await (0, batch_put_util_1.batchPut)(this.db, this.tableName, [
            templateModel,
            templateLocaleModelToUpdate,
            ...otherTemplateLocaleModels,
        ]);
        const patchedEntity = this.mapper.map(templateLocaleModelToUpdate, template_locale_model_1.TemplateLocaleModel, template_entity_1.Template);
        return patchedEntity;
    }
    async delete(tenantId, id, locale) {
        if (locale) {
            await this.db.delete({
                TableName: this.tableName,
                Key: { tenantId, itemKey: `${id}#${model_type_enum_1.ModelType.TEMPLATE_LOCALE}#${locale}` },
            });
            return;
        }
        const templateKey = { tenantId, itemKey: `${id}#${model_type_enum_1.ModelType.TEMPLATE}#` };
        const locales = await this.findLocales(tenantId, id);
        const templateLocaleKeys = locales.map((l) => ({
            tenantId,
            itemKey: `${id}#${model_type_enum_1.ModelType.TEMPLATE_LOCALE}#${l}`,
        }));
        await (0, batch_delete_util_1.batchDelete)(this.db, this.tableName, [templateKey, ...templateLocaleKeys]);
    }
    async exists(tenantId, id, locale) {
        if (locale) {
            const { Item: templateLocaleModel } = await this.db.get({
                TableName: this.tableName,
                Key: {
                    tenantId,
                    itemKey: `${id}#${model_type_enum_1.ModelType.TEMPLATE_LOCALE}#${locale}`,
                },
            });
            return !!templateLocaleModel;
        }
        const { Item: templateModel } = await this.db.get({
            TableName: this.tableName,
            Key: {
                tenantId,
                itemKey: `${id}#TEMPLATE#`,
            },
        });
        return !!templateModel;
    }
};
TemplateDynamoDbRepository = __decorate([
    __param(0, (0, nestjs_1.InjectMapper)()),
    __param(1, (0, common_1.Inject)(di_tokens_constant_1.UNIQUE_ID_SERVICE)),
    __param(3, (0, common_1.Inject)(dynamo_db_config_1.default.KEY)),
    __metadata("design:paramtypes", [Object, Object, lib_dynamodb_1.DynamoDBDocument, void 0])
], TemplateDynamoDbRepository);
exports.TemplateDynamoDbRepository = TemplateDynamoDbRepository;
//# sourceMappingURL=template-dynamo-db.repository.js.map