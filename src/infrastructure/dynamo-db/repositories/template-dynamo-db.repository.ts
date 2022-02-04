/* eslint-disable @typescript-eslint/no-unused-vars */
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Inject } from '@nestjs/common';
import { DEFAULT_LOCALE, UNIQUE_ID_SERVICE } from '../../../core/constants/di-tokens.constant';
import { Template, TemplateLocale } from '../../../core/entities/template.entity';
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

export class TemplateDynamoDbRepository implements TemplateRepository {
  private readonly tableName: string;

  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    @Inject(UNIQUE_ID_SERVICE) private readonly uniqueIdService: UniqueIdService,
    @Inject(DEFAULT_LOCALE) private readonly defaultLocale: string,
    private readonly db: DynamoDBDocument,
    configService: ConfigService,
  ) {
    const config = configService.get<DynamoDbConfig>('dynamoDb', defaultConfig);
    this.tableName = config.tableName;
  }

  async create(entity: Template): Promise<Template> {
    const now = getDateString();
    const id = await this.uniqueIdService.generate();
    const putInputs: PutCommandInput[] = [];

    const model = this.mapper.map(entity, TemplateModel, Template, {
      extraArguments: { now, id },
    });

    putInputs.push({ TableName: this.tableName, Item: model });

    if (entity.locales && entity.locales.length > 0) {
      entity.locales.forEach(async (l) => {
        const m = this.mapper.map(l, TemplateLocaleModel, TemplateLocale, {
          extraArguments: { now, templateId: model.id, tenantId: model.tenantId },
        });
        putInputs.push({ TableName: this.tableName, Item: m });
      });
    }

    await this.db.batchWrite({
      RequestItems: { [this.tableName]: putInputs.map((p) => ({ PutRequest: p })) },
    });

    const createdEntity = this.mapper.map(model, Template, TemplateModel, {
      extraArguments: { locales: entity.locales },
    });

    return createdEntity;
  }

  createLocale(tenantId: string, id: string, entity: TemplateLocale): Promise<Template> {
    throw new Error('Method not implemented.');
  }

  find(tenantId: string, limit: number, cursor?: any): Promise<Template[]> {
    throw new Error('Method not implemented.');
  }

  async findOne(tenantId: string, id: string, locale: string): Promise<Template> {
    const { Item: model } = await this.db.get({
      TableName: this.tableName,
      Key: { tenantId, itemKey: `${id}#${ModelType.TEMPLATE}#${locale}` },
    });

    const entity = this.mapper.map(model, Template, TemplateLocaleModel);

    return entity;
  }

  async findLocales(tenantId: string, id: string): Promise<string[]> {
    const { Items } = await this.db.query({
      TableName: this.tableName,
      ExpressionAttributeValues: {
        ':tenantId': tenantId,
        ':itemKey': `${id}#${ModelType.TEMPLATE}#`,
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

  delete(tenantId: string, id: string, locale?: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async exists(tenantId: string, id: string, locale?: string): Promise<boolean> {
    const template = locale
      ? await this.findOne(tenantId, id, locale)
      : await this.findTemplateMaster(tenantId, id);

    return !!template;
  }

  private async findTemplateMaster(
    tenantId: string,
    id: string,
  ): Promise<TemplateModel | undefined> {
    const { Item } = await this.db.get({
      TableName: this.tableName,
      Key: { tenantId, itemKey: `${id}#${ModelType.TEMPLATE_LOCALE}` },
    });

    return Item as TemplateModel | undefined;
  }
}
