import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller(':tenantId/template')
export class TemplateController {
  @Post()
  async create() {
    console.log('create');
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
