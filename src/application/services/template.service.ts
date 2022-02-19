import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DEFAULT_LOCALE, TEMPLATE_REPOSITORY } from '../../core/constants/di-tokens.constant';
import { TemplateLocale } from '../../core/entities/template-locale.entity';
import { Template } from '../../core/entities/template.entity';
import { PaginationResult } from '../../core/interfaces/pagination-result.interface';
import { TemplateRepository } from '../../core/repositories/template.repository';
import { CreateTemplateLocaleDto } from '../dtos/create-template-locale.dto';
import { CreateTemplateDto } from '../dtos/create-template.dto';
import { ReadTemplateLocaleDto } from '../dtos/read-template-locale.dto';
import { ReadTemplateDto } from '../dtos/read-template.dto';

@Injectable()
export class TemplateService {
  constructor(
    @Inject(TEMPLATE_REPOSITORY) private readonly templateRepository: TemplateRepository,
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

    const entity = this.mapper.map(dto, TemplateLocale, CreateTemplateLocaleDto, {
      extraArguments: { tenantId, id },
    });
    const createdEntity = await this.templateRepository.createLocale(tenantId, id, entity);
    const readDto = this.mapper.map(createdEntity, ReadTemplateLocaleDto, TemplateLocale);

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

  async find(
    tenantId: string,
    first = 10,
    before?: string,
    after?: string,
  ): Promise<PaginationResult<ReadTemplateDto>> {
    const result = await this.templateRepository.find(tenantId, first, before, after);
    const dtos = this.mapper.mapArray(result.items, ReadTemplateDto, Template);

    return { ...result, items: dtos };
  }
}
