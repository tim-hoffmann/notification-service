import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateTemplateDto } from '../../application/dtos/create-template.dto';
import { TemplateService } from '../../application/services/template.service';

@Controller(':tenantId/templates')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Post()
  async create(@Param('tenantId') tenantId: string, @Body() dto: CreateTemplateDto) {
    return await this.templateService.create(tenantId, dto);
  }

  @Get(':id')
  async findOne(
    @Param('tenantId') tenantId: string,
    @Param('id') id: string,
    @Query('locale') locale?: string,
  ) {
    return await this.templateService.findOne(tenantId, id, locale);
  }

  @Get()
  async readAll() {
    console.log('readAll');
  }

  @Put(':id')
  async update(@Param('id') id: string) {
    console.log('update', id);
  }

  @Delete(':id')
  async delete() {
    console.log('delete');
  }

  @Get(':id/locales')
  async readLocales() {
    console.log('delete');
  }
}
