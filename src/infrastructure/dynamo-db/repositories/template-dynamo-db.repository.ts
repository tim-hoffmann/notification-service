/* eslint-disable @typescript-eslint/no-unused-vars */
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Inject } from '@nestjs/common';
import { DEFAULT_LOCALE, UNIQUE_ID_SERVICE } from '../../../core/constants/di-tokens.constant';
import { Template } from '../../../core/entities/template.entity';
import { TemplateRepository } from '../../../core/repositories/template.repository';
import { UniqueIdService } from '../../../core/services/unique-id.service';
import { ModelType } from '../enums/model-type.enum';
import { TemplateLocaleModel } from '../models/template-locale.model';
import { TemplateModel } from '../models/template.model';
import { DynamoDBDocument, GetCommand, PutCommand, PutCommandInput } from '@aws-sdk/lib-dynamodb';
import { getDateString } from '../../../core/utils/date.util';
import { ConfigService } from '@nestjs/config';
import { DynamoDbConfig } from '../interfaces/dynamo-db-config.interface';
import { defaultConfig } from '../dynamo-db.config';
import { batchPut } from '../utils/batch-put.util';
import { EntityNotFoundException } from '../../../core/exceptions/entity-not-found.exception';
import { TemplateLocale } from '../../../core/entities/template-locale.entity';
import { BaseModel } from '../models/base.model';
import { READ_ALL_INDEX } from '../constants/indexes.constant';
import { PaginationResult } from '../../../core/interfaces/pagination-result.interface';
import {
  createCursor,
  createNextCursor,
  createPrevCursor,
  parseCursor,
} from '../utils/cursor.util';
import { batchDelete } from '../utils/batch-delete.util';

export class TemplateDynamoDbRepository implements TemplateRepository {
  private readonly tableName: string;

  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    @Inject(UNIQUE_ID_SERVICE) private readonly uniqueIdService: UniqueIdService,
    private readonly db: DynamoDBDocument,
    configService: ConfigService,
  ) {
    const config = configService.get<DynamoDbConfig>('dynamoDb', defaultConfig);
    this.tableName = config.tableName;
  }

  async create(entity: Template): Promise<Template> {
    const id = await this.uniqueIdService.generate();
    const opts = { extraArguments: { now: getDateString(), id } };

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
      extraArguments: { ...templateModel, now, id },
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

  update(
    tenantId: string,
    id: string,
    locale: string,
    update: Partial<Template>,
  ): Promise<Template> {
    throw new Error('Method not implemented.');
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
