import { classes } from '@automapper/classes';
import { CamelCaseNamingConvention, createMapper } from '@automapper/core';
import { getMapperToken } from '@automapper/nestjs';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { Test, TestingModule } from '@nestjs/testing';
import { UNIQUE_ID_SERVICE } from '../../../../core/constants/di-tokens.constant';
import { Template } from '../../../../core/entities/template.entity';
import { EntityNotFoundException } from '../../../../core/exceptions/entity-not-found.exception';
import dynamoDbConfig from '../../dynamo-db.config';
import { TemplateLocaleProfile } from '../../mapping/profiles/template-locale.profile';
import { TemplateProfile } from '../../mapping/profiles/template.profile';
import { TemplateDynamoDbRepository } from '../template-dynamo-db.repository';

const tableName = 'table';
const tenantId = 'test-tenant';
const id = 'test-id';
const defaultLocale = 'en-US';
const items = [
  {
    tenantId,
    itemKey: `${id}#TEMPLATE#`,
    createdAt: '2022-02-19T14:02:53.713Z',
    from: 'test@test.de',
    gsiSortKey: 'TEMPLATE#2022-02-19T14:02:53.713Z',
    id,
    locale: '',
    name: 'test2',
    subjectTemplate: '',
    textTemplate: '',
    transportType: 'Email',
    type: 'TEMPLATE',
    updatedAt: '2022-02-19T14:02:53.713Z',
  },
  {
    tenantId,
    itemKey: `${id}#TEMPLATE_LOCALE#en-US`,
    createdAt: '2022-02-19T14:04:26.409Z',
    from: 'test@test.de',
    gsiSortKey: '',
    id,
    locale: defaultLocale,
    name: 'test2',
    subjectTemplate: 'Hello',
    textTemplate: 'This is a Test!',
    transportType: 'Email',
    type: 'TEMPLATE_LOCALE',
    updatedAt: '2022-02-19T14:04:26.409Z',
  },
  {
    tenantId,
    itemKey: `${id}#TEMPLATE_LOCALE#de-DE`,
    createdAt: '2022-02-19T14:04:26.409Z',
    from: 'test@test.de',
    gsiSortKey: '',
    id,
    locale: 'de-DE',
    name: 'test2',
    subjectTemplate: 'Hallo',
    textTemplate: 'Das ist ein Test!',
    transportType: 'Email',
    type: 'TEMPLATE_LOCALE',
    updatedAt: '2022-02-19T14:04:26.409Z',
  },
];

describe('TemplateDynamoDbRepository', () => {
  let repository: TemplateDynamoDbRepository;
  let db: DynamoDBDocument;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getMapperToken(),
          useValue: createMapper({
            name: '',
            pluginInitializer: classes,
            namingConventions: new CamelCaseNamingConvention(),
          }),
        },
        { provide: UNIQUE_ID_SERVICE, useValue: { generate: jest.fn() } },
        { provide: dynamoDbConfig.KEY, useValue: { tableName } },
        { provide: DynamoDBDocument, useValue: { query: jest.fn(), batchWrite: jest.fn() } },
        TemplateProfile,
        TemplateLocaleProfile,
        TemplateDynamoDbRepository,
      ],
    }).compile();

    repository = module.get<TemplateDynamoDbRepository>(TemplateDynamoDbRepository);
    db = module.get<DynamoDBDocument>(DynamoDBDocument);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('update', () => {
    it('should throw EntityNotFound if template does not exists', async () => {
      // Arrange
      jest.spyOn(db, 'query').mockImplementation(() => Promise.resolve({ Items: [] }));
      const update: Partial<Template> = { name: 'updated-name' };

      // Act
      const t = async () => await repository.update(tenantId, id, defaultLocale, update);

      // Assert
      await expect(t).rejects.toThrow(EntityNotFoundException);
    });

    it('should update template data in database', async () => {
      // Arrange
      let updatedItems;
      jest.spyOn(db, 'query').mockImplementation(() => Promise.resolve({ Items: items }));
      jest
        .spyOn(db, 'batchWrite')
        .mockImplementation((items) => (updatedItems = items.RequestItems?.[tableName]));
      const update: Partial<Template> = { name: 'updated-name' };

      // Act
      await repository.update(tenantId, id, defaultLocale, update);

      // Assert
      expect(db.batchWrite).toHaveBeenCalledTimes(1);
      expect(updatedItems[0].PutRequest.Item.name).toBe(update.name);
      expect(updatedItems[1].PutRequest.Item.name).toBe(update.name);
    });

    it('should update template locale data in database', async () => {
      // Arrange
      let updatedItems;
      jest.spyOn(db, 'query').mockImplementation(() => Promise.resolve({ Items: items }));
      jest
        .spyOn(db, 'batchWrite')
        .mockImplementation((items) => (updatedItems = items.RequestItems?.[tableName]));
      const update: Partial<Template> = { localeFields: { textTemplate: 'text-update' } as any };

      // Act
      await repository.update(tenantId, id, defaultLocale, update);

      // Assert
      expect(db.batchWrite).toHaveBeenCalledTimes(1);
      expect(updatedItems[0].PutRequest.Item.textTemplate).toBe('');
      expect(updatedItems[1].PutRequest.Item.textTemplate).toBe(update.localeFields?.textTemplate);
      expect(updatedItems[2].PutRequest.Item.textTemplate).toBe(items[2].textTemplate);
    });

    it('should update template locale data of given locale in database', async () => {
      // Arrange
      const locale = 'de-DE';
      let updatedItems;
      jest.spyOn(db, 'query').mockImplementation(() => Promise.resolve({ Items: items }));
      jest
        .spyOn(db, 'batchWrite')
        .mockImplementation((items) => (updatedItems = items.RequestItems?.[tableName]));
      const update: Partial<Template> = {
        localeFields: { subjectTemplate: 'subject-update', htmlTemplate: 'html-update' } as any,
      };

      // Act
      await repository.update(tenantId, id, locale, update);

      // Assert
      expect(db.batchWrite).toHaveBeenCalledTimes(1);
      // Template
      expect(updatedItems[0].PutRequest.Item.subjectTemplate).toBe('');

      // TemplateLocale
      expect(updatedItems[1].PutRequest.Item.subjectTemplate).toBe(
        update.localeFields?.subjectTemplate,
      );
      expect(updatedItems[1].PutRequest.Item.htmlTemplate).toBe(update.localeFields?.htmlTemplate);
      expect(updatedItems[1].PutRequest.Item.locale).toBe(locale);

      // OtherTemplateLocales
      expect(updatedItems[2].PutRequest.Item.locale).toBe('en-US');
      expect(updatedItems[2].PutRequest.Item.htmlTemplate).toBeUndefined();
    });
  });
});
