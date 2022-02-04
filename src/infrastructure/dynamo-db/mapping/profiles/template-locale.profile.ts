import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { fromValue, mapFrom, Mapper, mapWithArguments } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { ModelType } from '../../enums/model-type.enum';
import { TemplateLocaleModel } from '../../models/template-locale.model';
import { Template } from '../../../../core/entities/template.entity';
import { TemplateLocale } from '../../../../core/entities/template-locale.entity';

@Injectable()
export class TemplateProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper: Mapper) => {
      mapper
        .createMap(Template, TemplateLocaleModel)
        .forMember((dst) => dst.type, fromValue(ModelType.TEMPLATE_LOCALE))
        .forMember(
          (dst) => dst.itemKey,
          mapWithArguments(
            (src, { id }) =>
              `${id ?? src.id}#${ModelType.TEMPLATE_LOCALE}#${src.localeFields.locale}`,
          ),
        )
        .forMember((dst) => dst.gsiSortKey, fromValue(undefined))
        .forMember(
          (dst) => dst.id,
          mapWithArguments((src, { id }) => id ?? src.id),
        )
        .forMember(
          (dst) => dst.createdAt,
          mapWithArguments((src, { now }) => now ?? src.createdAt),
        )
        .forMember(
          (dst) => dst.updatedAt,
          mapWithArguments((src, { now }) => now ?? src.updatedAt),
        )
        .forMember(
          (dst) => dst.textTemplate,
          mapFrom((src) => src.localeFields.textTemplate),
        )
        .forMember(
          (dst) => dst.subjectTemplate,
          mapFrom((src) => src.localeFields.subjectTemplate),
        )
        .forMember(
          (dst) => dst.htmlTemplate,
          mapFrom((src) => src.localeFields.htmlTemplate),
        )
        .forMember(
          (dst) => dst.locale,
          mapFrom((src) => src.localeFields.locale),
        );

      mapper.createMap(TemplateLocaleModel, TemplateLocale);

      mapper
        .createMap(TemplateLocaleModel, Template)
        .forMember(
          (dst) => dst.localeFields,
          mapFrom((src) => this.mapper.map(src, TemplateLocale, TemplateLocaleModel)),
        )
        .forMember(
          (dst) => dst.createdAt,
          mapFrom((src) => new Date(src.createdAt)),
        )
        .forMember(
          (dst) => dst.updatedAt,
          mapFrom((src) => new Date(src.updatedAt)),
        );
    };
  }
}
