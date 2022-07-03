import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper, mapWithArguments, forMember } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { CreateTemplateLocaleDto } from '../../dtos/create-template-locale.dto';
import { ReadTemplateLocaleDto } from '../../dtos/read-template-locale.dto';
import { CreateTemplateDto } from '../../dtos/create-template.dto';
import { TemplateLocale } from '../../../core/entities/template-locale.entity';
import { PatchTemplateDto } from '../../dtos/patch-template.dto';

@Injectable()
export class TemplateLocaleProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, CreateTemplateLocaleDto, TemplateLocale);
      createMap(mapper, TemplateLocale, ReadTemplateLocaleDto);

      createMap(
        mapper,
        CreateTemplateDto,
        TemplateLocale,
        forMember(
          (dst) => dst.locale,
          mapWithArguments((_, { locale }) => locale),
        ),
      );

      createMap(
        mapper,
        PatchTemplateDto,
        TemplateLocale,
        forMember(
          (dst) => dst.locale,
          mapWithArguments((_, { locale }) => locale),
        ),
      );
    };
  }
}
