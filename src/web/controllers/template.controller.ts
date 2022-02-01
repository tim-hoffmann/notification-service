import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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
  async read(@Param('id') id: string) {
    console.log('read', id);
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
