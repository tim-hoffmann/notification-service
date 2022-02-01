import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { fromValue, mapFrom, Mapper, mapWithArguments } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Template } from '../../../../core/entities/template.entity';
import { ModelType } from '../../enums/model-type.enum';
import { TemplateDataModel } from '../../models/template.data';

@Injectable()
export class TemplateProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper: Mapper) => {
      mapper
        .createMap(Template, TemplateDataModel)
        .forMember((dst) => dst.type, fromValue(ModelType.TEMPLATE))
        .forMember(
          (dst) => dst.itemKey,
          mapWithArguments<Template>(
            (src, { id }) => `${id ?? src.id}#${ModelType.TEMPLATE}#${src.locale}`,
          ),
        )
        .forMember(
          (dst) => dst.gsiSortKey,
          mapWithArguments<Template>(
            (src, { id, now }) =>
              `${ModelType.TEMPLATE}#${now ?? src.updatedAt}#${id ?? src.id}#${src.locale}`,
          ),
        )
        .forMember(
          (dst) => dst.createdAt,
          mapWithArguments<Template>((src, { now }) => now ?? src.createdAt),
        )
        .forMember(
          (dst) => dst.updatedAt,
          mapWithArguments<Template>((src, { now }) => now ?? src.updatedAt),
        )
        .forMember(
          (dst) => dst.id,
          mapWithArguments<Template>((src, { id }) => id ?? src.id),
        );

      mapper
        .createMap(TemplateDataModel, Template)
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
