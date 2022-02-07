import { TemplateLocale } from '../entities/template-locale.entity';
import { Template } from '../entities/template.entity';
import { PaginationResult } from '../interfaces/pagination-result.interface';

export interface TemplateRepository {
  create(entity: Template): Promise<Template>;

  createLocale(tenantId: string, id: string, entity: TemplateLocale): Promise<Template>;

  find(
    tenantId: string,
    limit: number,
    prevCursor?: any,
    nextCursor?: any,
  ): Promise<PaginationResult<Template>>;

  findOne(tenantId: string, id: string, locale: string): Promise<Template>;

  findLocales(tenantId: string, id: string): Promise<string[]>;

  update(
    tenantId: string,
    id: string,
    locale: string,
    update: Partial<Template>,
  ): Promise<Template>;

  delete(tenantId: string, id: string, locale?: string): Promise<void>;

  exists(tenantId: string, id: string, locale?: string): Promise<boolean>;
}
