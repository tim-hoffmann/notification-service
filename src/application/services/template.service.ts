import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TEMPLATE_REPOSITORY } from '../../core/constants/di-tokens.constant';
import { TemplateLocale } from '../../core/entities/template-locale.entity';
import { Template } from '../../core/entities/template.entity';
import { PaginationResult } from '../../core/interfaces/pagination-result.interface';
import { TemplateRepository } from '../../core/repositories/template.repository';
import applicationConfig from '../application.config';
import { CreateTemplateLocaleDto } from '../dtos/create-template-locale.dto';
import { CreateTemplateDto } from '../dtos/create-template.dto';
import { PatchTemplateDto } from '../dtos/patch-template.dto';
import { ReadTemplateLocaleDto } from '../dtos/read-template-locale.dto';
import { ReadTemplateDto } from '../dtos/read-template.dto';

@Injectable()
export class TemplateService {
  private readonly defaultLocale: string;

  constructor(
    @Inject(TEMPLATE_REPOSITORY) private readonly templateRepository: TemplateRepository,
    @Inject(applicationConfig.KEY) readonly config: ConfigType<typeof applicationConfig>,
    @InjectMapper() private readonly mapper: Mapper,
  ) {
    this.defaultLocale = config.defaultLocale;
  }

  async create(tenantId: string, dto: CreateTemplateDto): Promise<ReadTemplateDto> {
    const entity = this.mapper.map(dto, CreateTemplateDto, Template, {
      extraArgs: () => ({ tenantId, locale: this.defaultLocale }),
    });
    const createdEntity = await this.templateRepository.create(entity);
    const readDto = this.mapper.map(createdEntity, Template, ReadTemplateDto);

    return readDto;
  }

  async createLocale(
    tenantId: string,
    id: string,
    dto: CreateTemplateLocaleDto,
  ): Promise<ReadTemplateLocaleDto> {
    if (!(await this.templateRepository.exists(tenantId, id))) {
      throw new NotFoundException(`Template not found`);
    }

    if (await this.templateRepository.exists(tenantId, id, dto.locale)) {
      throw new BadRequestException(`Template with locale already exists: ${dto.locale}`);
    }

    const entity = this.mapper.map(dto, CreateTemplateLocaleDto, TemplateLocale, {
      extraArgs: () => ({ tenantId, id }),
    });
    const createdEntity = await this.templateRepository.createLocale(tenantId, id, entity);
    const readDto = this.mapper.map(createdEntity, TemplateLocale, ReadTemplateLocaleDto);

    return readDto;
  }

  async findOne(
    tenantId: string,
    id: string,
    locale: string = this.defaultLocale,
  ): Promise<ReadTemplateDto> {
    const entity = await this.templateRepository.findOne(tenantId, id, locale);
    const dto = this.mapper.map(entity, Template, ReadTemplateDto);

    return dto;
  }

  async findLocales(tenantId: string, id: string): Promise<string[]> {
    const locales = await this.templateRepository.findLocales(tenantId, id);

    if (locales.length <= 0) {
      throw new NotFoundException();
    }

    return locales;
  }

  async find(
    tenantId: string,
    first = 100,
    before?: string,
    after?: string,
  ): Promise<PaginationResult<ReadTemplateDto>> {
    const result = await this.templateRepository.find(tenantId, first, before, after);
    const dtos = this.mapper.mapArray(result.items, Template, ReadTemplateDto);

    return { ...result, items: dtos };
  }

  async patch(
    tenantId: string,
    id: string,
    dto: PatchTemplateDto,
    locale: string = this.defaultLocale,
  ): Promise<ReadTemplateDto> {
    const partialEntity = this.mapper.map(dto, PatchTemplateDto, Template, {
      extraArgs: () => ({ tenantId, locale }),
    });
    const patchedEntity = await this.templateRepository.update(tenantId, id, locale, partialEntity);
    const readDto = this.mapper.map(patchedEntity, Template, ReadTemplateDto);

    return readDto;
  }

  async delete(tenantId: string, id: string, locale?: string) {
    await this.templateRepository.delete(tenantId, id, locale);
  }
}
