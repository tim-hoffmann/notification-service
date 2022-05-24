import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateTemplateLocaleDto } from '../../application/dtos/create-template-locale.dto';
import { CreateTemplateDto } from '../../application/dtos/create-template.dto';
import { PaginationQueryDto } from '../../application/dtos/pagination-query.dto';
import { TemplateService } from '../../application/services/template.service';

@Controller(':tenantId/templates')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Post()
  async create(@Param('tenantId') tenantId: string, @Body() dto: CreateTemplateDto) {
    return await this.templateService.create(tenantId, dto);
  }

  @Get(':id')
  async findOne(@Param('tenantId') tenantId: string, @Param('id') id: string) {
    return await this.templateService.findOne(tenantId, id);
  }

  @Get()
  async find(
    @Param('tenantId') tenantId: string,
    @Query() { first, before, after }: PaginationQueryDto,
  ) {
    return await this.templateService.find(tenantId, first, before, after);
  }

  @Put(':id')
  async update(@Param('id') id: string) {
    console.log('update', id);
  }

  @Delete(':id')
  async delete(@Param('tenantId') tenantId: string, @Param('id') id: string) {
    return await this.templateService.delete(tenantId, id);
  }

  @Post(':id/locales')
  async createLocale(
    @Param('tenantId') tenantId: string,
    @Param('id') id: string,
    @Body() dto: CreateTemplateLocaleDto,
  ) {
    return await this.templateService.createLocale(tenantId, id, dto);
  }

  @Get(':id/locales/:locale')
  async findOneLocale(
    @Param('tenantId') tenantId: string,
    @Param('id') id: string,
    @Param('locale') locale: string,
  ) {
    return await this.templateService.findOne(tenantId, id, locale);
  }

  @Get(':id/locales')
  async findLocales(@Param('tenantId') tenantId: string, @Param('id') id: string) {
    return await this.templateService.findLocales(tenantId, id);
  }

  @Delete(':id/:locale')
  async deleteLocale(
    @Param('tenantId') tenantId: string,
    @Param('id') id: string,
    @Param('locale') locale: string,
  ) {
    return await this.templateService.delete(tenantId, id, locale);
  }
}
