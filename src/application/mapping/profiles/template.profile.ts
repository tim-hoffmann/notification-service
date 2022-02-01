import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { ignore, mapFrom, Mapper, mapWithArguments } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Template } from '../../../core/entities/template.entity';
import { ReadTemplateDto } from '../../dtos/read-template.dto';
import { CreateTemplateDto } from '../../dtos/create-template.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TemplateProfile extends AutomapperProfile {
  private readonly defaultLocale: string;

  constructor(@InjectMapper() mapper: Mapper, private readonly configService: ConfigService) {
    super(mapper);

    const defaultLocale = configService.get<string>('DEFAULT_LOCALE');
    if (!defaultLocale) throw new Error(`Could not find env variable: ${'DEFAULT_LOCALE'}`);
    this.defaultLocale = defaultLocale;
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
