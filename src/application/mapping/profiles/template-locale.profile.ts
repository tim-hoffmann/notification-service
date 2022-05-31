import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, mapWithArguments } from '@automapper/core';
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

  mapProfile() {
    return (mapper: Mapper) => {
      mapper.createMap(CreateTemplateLocaleDto, TemplateLocale);
      mapper.createMap(TemplateLocale, ReadTemplateLocaleDto);

      mapper.createMap(CreateTemplateDto, TemplateLocale).forMember(
        (dst) => dst.locale,
        mapWithArguments((_, { locale }) => locale),
      );

      mapper.createMap(PatchTemplateDto, TemplateLocale).forMember(
        (dst) => dst.locale,
        mapWithArguments((_, { locale }) => locale),
      );
    };
  }
}
