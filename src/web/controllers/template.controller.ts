import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateTemplateLocaleDto } from '../../application/dtos/create-template-locale.dto';
import { CreateTemplateDto } from '../../application/dtos/create-template.dto';
import { TemplateService } from '../../application/services/template.service';

@Controller(':tenantId/templates')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Post()
  async create(@Param('tenantId') tenantId: string, @Body() dto: CreateTemplateDto) {
    return await this.templateService.create(tenantId, dto);
  }

  @Post(':id/locales')
  async createLocale(
    @Param('tenantId') tenantId: string,
    @Param('id') id: string,
    @Body() dto: CreateTemplateLocaleDto,
  ) {
    return await this.templateService.createLocale(tenantId, id, dto);
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
  async find(
    @Param('tenantId') tenantId: string,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('beforeCursor') beforeCursor?: string,
    @Query('afterCursor') afterCursor?: string,
  ) {
    return await this.templateService.find(tenantId, limit, beforeCursor, afterCursor);
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
  async findLocales(@Param('tenantId') tenantId: string, @Param('id') id: string) {
    return await this.templateService.findLocales(tenantId, id);
  }
}
