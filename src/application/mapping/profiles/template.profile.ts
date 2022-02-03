import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { ignore, mapFrom, Mapper, mapWithArguments } from '@automapper/core';
import { Inject, Injectable } from '@nestjs/common';
import { Template } from '../../../core/entities/template.entity';
import { ReadTemplateDto } from '../../dtos/read-template.dto';
import { CreateTemplateDto } from '../../dtos/create-template.dto';
import { DEFAULT_LOCALE } from '../../../core/constants/di-tokens.constant';
import { CreateTemplateLocaleDto } from '../../dtos/create-template-locale.dto';

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

      mapper
        .createMap(CreateTemplateLocaleDto, Template)
        .forMember(
          (dst) => dst.tenantId,
          mapWithArguments((_, { tenantId }) => tenantId),
        )
        .forMember(
          (dst) => dst.id,
          mapWithArguments((_, { id }) => id),
        )
        .forMember((dst) => dst.createdAt, ignore())
        .forMember((dst) => dst.updatedAt, ignore())
        .forMember((dst) => dst.from, ignore())
        .forMember((dst) => dst.dataSchema, ignore())
        .forMember((dst) => dst.transportType, ignore())
        .forMember((dst) => dst.bcc, ignore());

      mapper.createMap(Template, ReadTemplateDto);
    };
  }
}
