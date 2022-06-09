/* eslint-disable @typescript-eslint/no-unused-vars */
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Inject } from '@nestjs/common';
import { UNIQUE_ID_SERVICE } from '../../../core/constants/di-tokens.constant';
import { Template } from '../../../core/entities/template.entity';
import { TemplateRepository } from '../../../core/repositories/template.repository';
import { UniqueIdService } from '../../../core/services/unique-id.service';
import { ModelType } from '../enums/model-type.enum';
import { TemplateLocaleModel } from '../models/template-locale.model';
import { TemplateModel } from '../models/template.model';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { getDateString } from '../../../core/utils/date.util';
import { ConfigType } from '@nestjs/config';
import { batchPut } from '../utils/batch-put.util';
import { EntityNotFoundException } from '../../../core/exceptions/entity-not-found.exception';
import { TemplateLocale } from '../../../core/entities/template-locale.entity';
import { READ_ALL_INDEX } from '../constants/indexes.constant';
import { PaginationResult } from '../../../core/interfaces/pagination-result.interface';
import { createNextCursor, createPrevCursor, parseCursor } from '../utils/cursor.util';
import { batchDelete } from '../utils/batch-delete.util';
import dynamoDbConfig from '../dynamo-db.config';

export class TemplateDynamoDbRepository implements TemplateRepository {
  private readonly tableName: string;

  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    @Inject(UNIQUE_ID_SERVICE) private readonly uniqueIdService: UniqueIdService,
    private readonly db: DynamoDBDocument,
    @Inject(dynamoDbConfig.KEY) config: ConfigType<typeof dynamoDbConfig>,
  ) {
    this.tableName = config.tableName;
  }

  async create(entity: Template): Promise<Template> {
    const id = await this.uniqueIdService.generate();
    const now = getDateString();
    const opts = { extraArguments: { createdAt: now, updatedAt: now, id } };

    const templateModel = this.mapper.map(entity, TemplateModel, Template, opts);
    const templateLocaleModel = this.mapper.map(entity, TemplateLocaleModel, Template, opts);

    await batchPut(this.db, this.tableName, [templateModel, templateLocaleModel]);

    const createdEntity = this.mapper.map(templateLocaleModel, Template, TemplateLocaleModel);

    return createdEntity;
  }

  async createLocale(
    tenantId: string,
    id: string,
    entity: TemplateLocale,
  ): Promise<TemplateLocale> {
    const now = getDateString();
    const { Item: templateModel } = await this.db.get({
      TableName: this.tableName,
      Key: {
        tenantId,
        itemKey: `${id}#TEMPLATE#`,
      },
    });

    const templateLocaleModel = this.mapper.map(entity, TemplateLocaleModel, TemplateLocale, {
      extraArguments: { ...templateModel, createdAt: now, updatedAt: now, id },
    });

    await this.db.put({ TableName: this.tableName, Item: templateLocaleModel });

    return entity;
  }

  async find(
    tenantId: string,
    first: number,
    before?: any,
    after?: any,
  ): Promise<PaginationResult<Template>> {
    const cursor = parseCursor(before ?? after);

    const { Items: models, LastEvaluatedKey } = await this.db.query({
      TableName: this.tableName,
      IndexName: READ_ALL_INDEX,
      Limit: first + 1,
      ExclusiveStartKey: cursor,
      ScanIndexForward: !!before,
      ExpressionAttributeValues: {
        ':tenantId': tenantId,
        ':gsiSortKey': `${ModelType.TEMPLATE}#`,
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

    const entities = this.mapper.mapArray(models.slice(0, first), Template, TemplateModel);
    const startCursor = createPrevCursor(models, after, before, LastEvaluatedKey);
    const endCursor = createNextCursor(models, before, first, LastEvaluatedKey);

    return {
      items: entities,
      startCursor,
      endCursor,
      hasPreviousPage: !!startCursor,
      hasNextPage: !!endCursor,
    };
  }

  async findOne(tenantId: string, id: string, locale: string): Promise<Template> {
    const { Item: model } = await this.db.get({
      TableName: this.tableName,
      Key: {
        tenantId,
        itemKey: `${id}#${ModelType.TEMPLATE_LOCALE}#${locale}`,
      },
    });

    if (!model) {
      throw new EntityNotFoundException();
    }

    const entity = this.mapper.map(model, Template, TemplateLocaleModel);

    return entity;
  }

  async findLocales(tenantId: string, id: string): Promise<string[]> {
    const { Items } = await this.db.query({
      TableName: this.tableName,
      ExpressionAttributeValues: {
        ':tenantId': tenantId,
        ':itemKey': `${id}#${ModelType.TEMPLATE_LOCALE}#`,
      },
      ExpressionAttributeNames: {
        '#tenantId': 'tenantId',
        '#itemKey': 'itemKey',
      },
      KeyConditionExpression: '#tenantId = :tenantId and begins_with(#itemKey, :itemKey)',
    });

    const locales = Items?.map<string>((i) => i.locale) ?? [];

    return locales;
  }

  async update(
    tenantId: string,
    id: string,
    locale: string,
    update: Partial<Template>,
  ): Promise<Template> {
    // 1. Get all models
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

    // 2. Filter TemplateModel, TemplateLocaleModel to update and rest of TemplateLocaleModels
    const templateModel = models?.find((m) => m.type === ModelType.TEMPLATE) as
      | TemplateModel
      | undefined;
    const templateLocaleModelToUpdate = models?.find((m) => m.locale === locale) as
      | TemplateLocaleModel
      | undefined;
    const otherTemplateLocaleModels = models?.filter(
      (m) => m.type === ModelType.TEMPLATE_LOCALE && m.locale !== locale,
    ) as TemplateLocaleModel[] | undefined;

    // 3. Check models exist
    if (
      !models?.length ||
      !templateModel ||
      !otherTemplateLocaleModels ||
      !templateLocaleModelToUpdate
    ) {
      throw new EntityNotFoundException();
    }

    const now = getDateString();
    this.mapper.map(update, TemplateModel, Template, templateModel, {
      extraArguments: { updatedAt: now, id },
    });
    this.mapper.map(update, TemplateLocaleModel, Template, templateLocaleModelToUpdate, {
      extraArguments: { updatedAt: now, id, locale },
    });

    otherTemplateLocaleModels.forEach((_, i) =>
      this.mapper.map(update, TemplateLocaleModel, Template, otherTemplateLocaleModels[i], {
        extraArguments: {
          localeFields: otherTemplateLocaleModels[i],
          updatedAt: now,
          id,
          locale: otherTemplateLocaleModels[i].locale,
        },
      }),
    );

    await batchPut(this.db, this.tableName, [
      templateModel,
      templateLocaleModelToUpdate,
      ...otherTemplateLocaleModels,
    ]);

    const patchedEntity = this.mapper.map(
      templateLocaleModelToUpdate,
      Template,
      TemplateLocaleModel,
    );

    return patchedEntity;
  }

  async delete(tenantId: string, id: string, locale?: string): Promise<void> {
    // Only delete template locale if locale is set
    if (locale) {
      await this.db.delete({
        TableName: this.tableName,
        Key: { tenantId, itemKey: `${id}#${ModelType.TEMPLATE_LOCALE}#${locale}` },
      });
      return;
    }

    // Delete all template locales and template if locale is not set
    const templateKey = { tenantId, itemKey: `${id}#${ModelType.TEMPLATE}#` };
    const locales = await this.findLocales(tenantId, id);
    const templateLocaleKeys = locales.map((l) => ({
      tenantId,
      itemKey: `${id}#${ModelType.TEMPLATE_LOCALE}#${l}`,
    }));
    await batchDelete(this.db, this.tableName, [templateKey, ...templateLocaleKeys]);
  }

  async exists(tenantId: string, id: string, locale?: string): Promise<boolean> {
    if (locale) {
      const { Item: templateLocaleModel } = await this.db.get({
        TableName: this.tableName,
        Key: {
          tenantId,
          itemKey: `${id}#${ModelType.TEMPLATE_LOCALE}#${locale}`,
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
}
