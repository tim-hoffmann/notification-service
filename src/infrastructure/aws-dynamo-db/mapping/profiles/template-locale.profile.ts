import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  createMap,
  fromValue,
  Mapper,
  mapWithArguments,
  forMember,
  mapFrom,
} from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { ModelType } from '../../enums/model-type.enum';
import { TemplateLocaleModel } from '../../models/template-locale.model';
import { Template } from '../../../../core/entities/template.entity';
import { TemplateLocale } from '../../../../core/entities/template-locale.entity';

@Injectable()
export class TemplateLocaleProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        Template,
        TemplateLocaleModel,
        forMember((dst) => dst.type, fromValue(ModelType.TEMPLATE_LOCALE)),
        forMember(
          (dst) => dst.itemKey,
          mapWithArguments(
            (src, { id, locale }) => `${id ?? src.id}#${ModelType.TEMPLATE_LOCALE}#${locale}`,
          ),
        ),
        forMember((dst) => dst.gsiSortKey, fromValue(undefined)),
        forMember(
          (dst) => dst.id,
          mapWithArguments((src, { id }) => id ?? src.id),
        ),
        forMember(
          (dst) => dst.createdAt,
          mapWithArguments((src, { createdAt }) => createdAt ?? src.createdAt),
        ),
        forMember(
          (dst) => dst.updatedAt,
          mapWithArguments((src, { updatedAt }) => updatedAt ?? src.updatedAt),
        ),
        forMember(
          (dst) => dst.textTemplate,
          mapWithArguments((src, { localeFields }) =>
            localeFields
              ? (localeFields as TemplateLocaleModel)?.textTemplate
              : src.localeFields?.textTemplate,
          ),
        ),
        forMember(
          (dst) => dst.subjectTemplate,
          mapWithArguments((src, { localeFields }) =>
            localeFields
              ? (localeFields as TemplateLocaleModel)?.subjectTemplate
              : src.localeFields?.subjectTemplate,
          ),
        ),
        forMember(
          (dst) => dst.htmlTemplate,
          mapWithArguments((src, { localeFields }) =>
            localeFields
              ? (localeFields as TemplateLocaleModel)?.htmlTemplate
              : src.localeFields?.htmlTemplate,
          ),
        ),
        forMember(
          (dst) => dst.locale,
          mapWithArguments((src, { locale }) => locale),
        ),
      );

      createMap(mapper, TemplateLocaleModel, TemplateLocale);

      createMap(
        mapper,
        TemplateLocaleModel,
        Template,
        forMember(
          (dst) => dst.createdAt,
          mapFrom((src) => new Date(src.createdAt)),
        ),
        forMember(
          (dst) => dst.updatedAt,
          mapFrom((src) => new Date(src.updatedAt)),
        ),
        forMember(
          (dst) => dst.localeFields,
          mapFrom((src) => mapper.map(src, TemplateLocaleModel, TemplateLocale)),
        ),
      );

      createMap(
        mapper,
        TemplateLocale,
        TemplateLocaleModel,
        forMember(
          (dst) => dst.id,
          mapWithArguments((src, { id }) => id),
        ),
        forMember(
          (dst) => dst.tenantId,
          mapWithArguments((_, { tenantId }) => tenantId),
        ),
        forMember((dst) => dst.type, fromValue(ModelType.TEMPLATE_LOCALE)),
        forMember(
          (dst) => dst.itemKey,
          mapWithArguments((_, { id, locale }) => `${id}#${ModelType.TEMPLATE_LOCALE}#${locale}`),
        ),
        forMember((dst) => dst.gsiSortKey, fromValue(undefined)),
        forMember(
          (dst) => dst.createdAt,
          mapWithArguments((_, { createdAt }) => createdAt),
        ),
        forMember(
          (dst) => dst.updatedAt,
          mapWithArguments((_, { updatedAt }) => updatedAt),
        ),
        forMember(
          (dst) => dst.name,
          mapWithArguments((_, { name }) => name),
        ),
        forMember(
          (dst) => dst.from,
          mapWithArguments((_, { from }) => from),
        ),
        forMember(
          (dst) => dst.transportType,
          mapWithArguments((_, { transportType }) => transportType),
        ),
        forMember(
          (dst) => dst.dataSchema,
          mapWithArguments((_, { dataSchema }) => dataSchema),
        ),
        forMember(
          (dst) => dst.bcc,
          mapWithArguments((_, { bcc }) => bcc),
        ),
      );
    };
  }
}
