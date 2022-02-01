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

export class TemplateRepository implements ITemplateRepository {
  private readonly tableName: string;

  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    @Inject(UNIQUE_ID_SERVICE) private readonly uniqueIdService: UniqueIdService,
    @Inject(DEFAULT_LOCALE) private readonly defaultLocale: string,
    private readonly client: DynamoDBDocument,
    configService: ConfigService,
  ) {
    const config = configService.get<DynamoDbConfig>('dynamoDb', defaultConfig);
    this.tableName = config.tableName;
  }

  async create(entity: Template): Promise<Template> {
    const now = getDateString();

    // 1. Try to get master template
    const { Item: templateMasterModel } = await this.client.get({
      TableName: this.tableName,
      Key: {
        tenantId: entity.tenantId,
        itemKey: `${entity.id}#${ModelType.TEMPLATE_MASTER}`,
      },
    });

    const id = templateMasterModel?.id ?? (await this.uniqueIdService.generate());

    // 2. Create master template if doesn't exist
    if (!templateMasterModel) {
      const newTemplateMasterModel = this.mapper.map(entity, TemplateMasterDataModel, Template, {
        extraArguments: { now, id },
      });

      await this.client.put({ TableName: this.tableName, Item: newTemplateMasterModel });
    }

    // 3. Create template
    const templateModel = this.mapper.map(entity, TemplateDataModel, Template, {
      extraArguments: { now, id },
    });

    await this.client.put({ TableName: this.tableName, Item: templateModel });

    // 4. Return created template
    const createdEntity = this.mapper.map(templateModel, Template, TemplateDataModel);

    return createdEntity;
  }

  find(tenantId: string, limit: number, cursor?: any): Promise<Template[]> {
    throw new Error('Method not implemented.');
  }

  async findOne(tenantId: string, id: string, locale: string): Promise<Template> {
    const { Item: model } = await this.client.get({
      TableName: this.tableName,
      Key: { tenantId, itemKey: `${id}#${ModelType.TEMPLATE}#${locale}` },
    });

    const entity = this.mapper.map(model, Template, TemplateDataModel);

    return entity;
  }

  findLocales(tenantId: string, id: string): Promise<string[]> {
    throw new Error('Method not implemented.');
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

  exists(tenantId: string, id: string, locale?: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
