import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { ignore, mapFrom, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { CreateTemplateLocaleDto } from '../../dtos/create-template-locale.dto';
import { ReadTemplateLocaleDto } from '../../dtos/read-template-locale.dto';
import { TemplateLocale } from '../../../core/entities/template.entity';

@Injectable()
export class TemplateLocaleProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper: Mapper) => {
      mapper
        .createMap(CreateTemplateLocaleDto, TemplateLocale)
        .forMember(
          (dst) => dst.id,
          mapFrom((src) => src.locale),
        )
        .forMember((dst) => dst.createdAt, ignore())
        .forMember((dst) => dst.updatedAt, ignore());

      mapper.createMap(TemplateLocale, ReadTemplateLocaleDto).forMember(
        (dst) => dst.locale,
        mapFrom((src) => src.id),
      );
    };
  }
}
