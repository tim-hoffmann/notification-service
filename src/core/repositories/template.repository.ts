import { Template } from '../entities/template.entity';

export interface ITemplateRepository {
  create(entity: Template): Promise<Template>;

  find(tenantId: string, limit: number, cursor?: any): Promise<Template[]>;

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
