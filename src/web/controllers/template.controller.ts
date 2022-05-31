import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTemplateLocaleDto } from '../../application/dtos/create-template-locale.dto';
import { CreateTemplateDto } from '../../application/dtos/create-template.dto';
import { PaginationQueryDto } from '../../application/dtos/pagination-query.dto';
import { PatchTemplateDto } from '../../application/dtos/patch-template.dto';
import { TemplateService } from '../../application/services/template.service';

@Controller(':tenantId/templates')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Post()
  async create(@Param('tenantId') tenantId: string, @Body() dto: CreateTemplateDto) {
    return this.templateService.create(tenantId, dto);
  }

  @Get(':id')
  async findOne(
    @Param('tenantId') tenantId: string,
    @Param('id') id: string,
    @Query('locale') locale?: string,
  ) {
    return this.templateService.findOne(tenantId, id, locale);
  }

  @Get()
  async find(
    @Param('tenantId') tenantId: string,
    @Query() { first, before, after }: PaginationQueryDto,
  ) {
    return this.templateService.find(tenantId, first, before, after);
  }

  @Patch(':id')
  async patch(
    @Param('tenantId') tenantId: string,
    @Param('id') id: string,
    @Body() dto: PatchTemplateDto,
    @Query('locale') locale?: string,
  ) {
    return this.templateService.patch(tenantId, id, dto, locale);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(
    @Param('tenantId') tenantId: string,
    @Param('id') id: string,
    @Query('locale') locale?: string,
  ) {
    return this.templateService.delete(tenantId, id, locale);
  }

  @Post(':id/locales')
  async createLocale(
    @Param('tenantId') tenantId: string,
    @Param('id') id: string,
    @Body() dto: CreateTemplateLocaleDto,
  ) {
    return this.templateService.createLocale(tenantId, id, dto);
  }

  @Get(':id/locales')
  async findLocales(@Param('tenantId') tenantId: string, @Param('id') id: string) {
    return this.templateService.findLocales(tenantId, id);
  }
}
