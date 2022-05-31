import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { ignore, mapFrom, Mapper, mapWithArguments } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Template } from '../../../core/entities/template.entity';
import { ReadTemplateDto } from '../../dtos/read-template.dto';
import { CreateTemplateDto } from '../../dtos/create-template.dto';
import { TemplateLocale } from '../../../core/entities/template-locale.entity';
import { PatchTemplateDto } from '../../dtos/patch-template.dto';

@Injectable()
export class TemplateProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
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
          (dst) => dst.localeFields,
          mapWithArguments((src, { locale }) =>
            this.mapper.map(src, TemplateLocale, CreateTemplateDto, { extraArguments: { locale } }),
          ),
        );

      mapper
        .createMap(PatchTemplateDto, Template)
        .forMember(
          (dst) => dst.tenantId,
          mapWithArguments((_, { tenantId }) => tenantId),
        )
        .forMember((dst) => dst.id, ignore())
        .forMember((dst) => dst.createdAt, ignore())
        .forMember((dst) => dst.updatedAt, ignore())
        .forMember(
          (dst) => dst.localeFields,
          mapWithArguments((src, { locale }) =>
            this.mapper.map(src, TemplateLocale, PatchTemplateDto, { extraArguments: { locale } }),
          ),
        );

      mapper
        .createMap(Template, ReadTemplateDto)
        .forMember(
          (dst) => dst.htmlTemplate,
          mapFrom((src) => src.localeFields.htmlTemplate),
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
          (dst) => dst.locale,
          mapFrom((src) => src.localeFields.locale),
        );
    };
  }
}
