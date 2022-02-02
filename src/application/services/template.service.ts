import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Inject, Injectable } from '@nestjs/common';
import { DEFAULT_LOCALE } from '../../core/constants/di-tokens.constant';
import { Template } from '../../core/entities/template.entity';
import { TemplateRepository } from '../../infrastructure/dynamo-db/repositories/template.repository';
import { CreateTemplateDto } from '../dtos/create-template.dto';
import { ReadTemplateDto } from '../dtos/read-template.dto';

@Injectable()
export class TemplateService {
  constructor(
    private readonly templateRepository: TemplateRepository,
    @Inject(DEFAULT_LOCALE) private readonly defaultLocale: string,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async create(tenantId: string, dto: CreateTemplateDto): Promise<ReadTemplateDto> {
    const entity = this.mapper.map(dto, Template, CreateTemplateDto, {
      extraArguments: { tenantId },
    });
    const createdEntity = await this.templateRepository.create(entity);
    const readDto = this.mapper.map(createdEntity, ReadTemplateDto, Template);

    return readDto;
  }

  async findOne(
    tenantId: string,
    id: string,
    locale: string = this.defaultLocale,
  ): Promise<ReadTemplateDto> {
    const entity = await this.templateRepository.findOne(tenantId, id, locale);
    const dto = this.mapper.map(entity, ReadTemplateDto, Template);

    return dto;
  }

  async findLocales(tenantId: string, id: string): Promise<string[]> {
    return await this.templateRepository.findLocales(tenantId, id);
  }
}
