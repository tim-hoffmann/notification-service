import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { fromValue, mapFrom, Mapper, mapWithArguments } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Template } from '../../../../core/entities/template.entity';
import { TemplateModel } from '../../models/template.model';
import { ModelType } from '../../enums/model-type.enum';

@Injectable()
export class TemplateProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper: Mapper) => {
      mapper
        .createMap(Template, TemplateModel)
        .forMember((dst) => dst.type, fromValue(ModelType.TEMPLATE))
        .forMember(
          (dst) => dst.itemKey,
          mapWithArguments((src, { id }) => `${id ?? src.id}#${ModelType.TEMPLATE}#`),
        )
        .forMember(
          (dst) => dst.gsiSortKey,
          mapWithArguments(
            (src, { updatedAt }) => `${ModelType.TEMPLATE}#${updatedAt ?? src.updatedAt}`,
          ),
        )
        .forMember(
          (dst) => dst.createdAt,
          mapWithArguments((src, { createdAt }) => createdAt ?? src.createdAt),
        )
        .forMember(
          (dst) => dst.updatedAt,
          mapWithArguments((src, { updatedAt }) => updatedAt ?? src.updatedAt),
        )
        .forMember(
          (dst) => dst.id,
          mapWithArguments((src, { id }) => id ?? src.id),
        );

      mapper
        .createMap(TemplateModel, Template)
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
