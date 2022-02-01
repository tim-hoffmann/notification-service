import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Template } from '../../core/entities/template.entity';
import { TemplateRepository } from '../../infrastructure/dynamo-db/repositories/template.repostory';
import { CreateTemplateDto } from '../dtos/create-template.dto';
import { ReadTemplateDto } from '../dtos/read-template.dto';

@Injectable()
export class TemplateService {
  constructor(
    private readonly templateRepository: TemplateRepository,
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
}
