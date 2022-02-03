/* eslint-disable @typescript-eslint/no-unused-vars */
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Inject } from '@nestjs/common';
import { DEFAULT_LOCALE, UNIQUE_ID_SERVICE } from '../../../core/constants/di-tokens.constant';
import { Template } from '../../../core/entities/template.entity';
import { ITemplateRepository } from '../../../core/repositories/template.repository';
import { UniqueIdService } from '../../../core/services/unique-id.service';
import { ModelType } from '../enums/model-type.enum';
import { TemplateDataModel } from '../models/template.data';
import { TemplateMasterDataModel } from '../models/templateMaster.data';
import { DynamoDBDocument, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { getDateString } from '../../../core/utils/date.util';
import { ConfigService } from '@nestjs/config';
import { DynamoDbConfig } from '../interfaces/dynamo-db-config.interface';
import { defaultConfig } from '../dynamo-db.config';
import { READ_ALL_INDEX } from '../constants/indexes.constant';
import { stringify } from 'querystring';

export class TemplateRepository implements ITemplateRepository {
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

    // 1. Try to get master template
    let templateMasterModel: TemplateMasterDataModel | undefined;

    if (entity.id) {
      templateMasterModel = await this.findTemplateMaster(entity.tenantId, entity.id);
    }

    const id = templateMasterModel?.id ?? (await this.uniqueIdService.generate());

    // 2. Create master template if doesn't exist
    if (!templateMasterModel) {
      const newTemplateMasterModel = this.mapper.map(entity, TemplateMasterDataModel, Template, {
        extraArguments: { now, id },
      });

      await this.db.put({ TableName: this.tableName, Item: newTemplateMasterModel });
    }

    // 3. Create template
    const templateModel = this.mapper.map(entity, TemplateDataModel, Template, {
      extraArguments: { now, id },
    });

    await this.db.put({
      TableName: this.tableName,
      Item: { ...templateMasterModel, ...templateModel },
    });

    // 4. Return created template
    const createdEntity = this.mapper.map(templateModel, Template, TemplateDataModel);

    return createdEntity;
  }

  find(tenantId: string, limit: number, cursor?: any): Promise<Template[]> {
    throw new Error('Method not implemented.');
  }

  async findOne(tenantId: string, id: string, locale: string): Promise<Template> {
    const { Item: model } = await this.db.get({
      TableName: this.tableName,
      Key: { tenantId, itemKey: `${id}#${ModelType.TEMPLATE}#${locale}` },
    });

    const entity = this.mapper.map(model, Template, TemplateDataModel);

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
  ): Promise<TemplateMasterDataModel | undefined> {
    const { Item } = await this.db.get({
      TableName: this.tableName,
      Key: { tenantId, itemKey: `${id}#${ModelType.TEMPLATE_MASTER}` },
    });

    return Item as TemplateMasterDataModel | undefined;
  }
}
