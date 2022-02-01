import { classes } from '@automapper/classes';
import { Mapper, createMapper, CamelCaseNamingConvention } from '@automapper/core';
import { getMapperToken } from '@automapper/nestjs';
import { TestingModule, Test } from '@nestjs/testing';
import { Template } from '../../../../../core/entities/template.entity';
import { TransportType } from '../../../../../core/enums/transport-type.enum';
import { ModelType } from '../../../enums/model-type.enum';
import { TemplateDataModel } from '../../../models/template.data';
import { TemplateProfile } from '../template.profile';

describe('TemplateProfile', () => {
  let mapper: Mapper;

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
        TemplateProfile,
      ],
    }).compile();

    mapper = module.get<Mapper>(getMapperToken());
  });

  it('should be defined', () => {
    expect(mapper).toBeDefined();
  });

  it('should map Template to TemplateDataModel', () => {
    // Arrange
    const entity: Template = {
      id: 'id',
      tenantId: 'tenantId',
      bcc: ['bcc'],
      createdAt: new Date(2022, 1, 1),
      updatedAt: new Date(2022, 1, 1),
      dataSchema: 'dataSchema',
      from: 'from',
      htmlTemplate: ' htmlTemplate',
      locale: 'locale',
      name: 'name',
      subjectTemplate: 'subjectTemplate',
      textTemplate: 'textTemplate',
      transportType: TransportType.Email,
    };

    // Act
    const model = mapper.map(entity, TemplateDataModel, Template);

    // Assert
    expect(model.id).toBe(entity.id);
    expect(model.tenantId).toBe(entity.tenantId);
    expect(model.bcc).toStrictEqual(entity.bcc);
    expect(model.createdAt).toStrictEqual(entity.createdAt);
    expect(model.updatedAt).toStrictEqual(entity.updatedAt);
    expect(model.dataSchema).toBe(entity.dataSchema);
    expect(model.from).toBe(entity.from);
    expect(model.htmlTemplate).toBe(entity.htmlTemplate);
    expect(model.locale).toBe(entity.locale);
    expect(model.name).toBe(entity.name);
    expect(model.subjectTemplate).toBe(entity.subjectTemplate);
    expect(model.textTemplate).toBe(entity.textTemplate);
    expect(model.transportType).toBe(entity.transportType);
    expect(model.type).toBe(ModelType.TEMPLATE);
    expect(model.itemKey).toBe(`${entity.id}#${ModelType.TEMPLATE}#${entity.locale}`);
    expect(model.gsiSortKey).toBe(
      `${ModelType.TEMPLATE}#${entity.updatedAt}#${entity.id}#${entity.locale}`,
    );
  });
});
