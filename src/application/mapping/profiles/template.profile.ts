import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { ignore, mapFrom, Mapper, mapWithArguments } from '@automapper/core';
import { Inject, Injectable } from '@nestjs/common';
import { Template } from '../../../core/entities/template.entity';
import { ReadTemplateDto } from '../../dtos/read-template.dto';
import { CreateTemplateDto } from '../../dtos/create-template.dto';
import { DEFAULT_LOCALE } from '../../../core/constants/di-tokens.constant';

@Injectable()
export class TemplateProfile extends AutomapperProfile {
  constructor(
    @InjectMapper() mapper: Mapper,
    @Inject(DEFAULT_LOCALE) private readonly defaultLocale: string,
  ) {
    super(mapper);
  }

  mapProfile() {
    return (mapper: Mapper) => {
      mapper
        .createMap(CreateTemplateDto, Template)
        .forMember(
          (dst) => dst.tenantId,
          mapWithArguments((_, { tenantId }) => tenantId),
        )
        .forMember((dst) => dst.id, ignore())
        .forMember((dst) => dst.createdAt, ignore())
        .forMember((dst) => dst.updatedAt, ignore())
        .forMember(
          (dst) => dst.locale,
          mapFrom((src) => src.locale ?? this.defaultLocale),
        );

      mapper.createMap(Template, ReadTemplateDto);
    };
  }
}
