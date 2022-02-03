import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { fromValue, mapFrom, Mapper, mapWithArguments } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Template } from '../../../../core/entities/template.entity';
import { TemplateMasterDataModel } from '../../models/templateMaster.data';
import { ModelType } from '../../enums/model-type.enum';

@Injectable()
export class TemplateMasterProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper: Mapper) => {
      mapper
        .createMap(Template, TemplateMasterDataModel)
        .forMember((dst) => dst.type, fromValue(ModelType.TEMPLATE_MASTER))
        .forMember(
          (dst) => dst.itemKey,
          mapWithArguments<Template>(
            (src, { id }) => `${id ?? src.id}#${ModelType.TEMPLATE_MASTER}`,
          ),
        )
        .forMember(
          (dst) => dst.gsiSortKey,
          mapWithArguments<Template>(
            (src, { id, now }) =>
              `${ModelType.TEMPLATE_MASTER}#${now ?? src.updatedAt}#${id ?? src.id}`,
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
        .createMap(TemplateMasterDataModel, Template)
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
