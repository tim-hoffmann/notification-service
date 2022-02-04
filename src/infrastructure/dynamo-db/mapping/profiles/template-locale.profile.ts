import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { fromValue, mapFrom, Mapper, mapWithArguments } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { TemplateLocale } from '../../../../core/entities/template.entity';
import { ModelType } from '../../enums/model-type.enum';
import { TemplateLocaleModel } from '../../models/template-locale.model';

@Injectable()
export class TemplateProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper: Mapper) => {
      mapper
        .createMap(TemplateLocale, TemplateLocaleModel)
        .forMember(
          (dst) => dst.tenantId,
          mapWithArguments((_, { tenantId }) => tenantId),
        )
        .forMember((dst) => dst.type, fromValue(ModelType.TEMPLATE_LOCALE))
        .forMember(
          (dst) => dst.itemKey,
          mapWithArguments<TemplateLocale>(
            (src, { templateId }) => `${templateId}#${ModelType.TEMPLATE_LOCALE}#${src.id}`,
          ),
        )
        .forMember(
          (dst) => dst.createdAt,
          mapWithArguments<TemplateLocale>((src, { now }) => now ?? src.createdAt),
        )
        .forMember(
          (dst) => dst.updatedAt,
          mapWithArguments<TemplateLocale>((src, { now }) => now ?? src.updatedAt),
        );

      mapper
        .createMap(TemplateLocaleModel, TemplateLocale)
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
