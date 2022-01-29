import { Template } from '../../../core/entities/template.entity';
import { ITemplateRepository } from '../../../core/repositories/template.repository';

export class TemplateRepository implements ITemplateRepository {
  create(entity: Template): Promise<Template> {
    throw new Error('Method not implemented.');
  }
  find(tenantId: string, limit: number, cursor?: any): Promise<Template[]> {
    throw new Error('Method not implemented.');
  }
  findOne(tenantId: string, id: string, locale: string): Promise<Template> {
    throw new Error('Method not implemented.');
  }
  findLocales(tenantId: string, id: string): Promise<string[]> {
    throw new Error('Method not implemented.');
  }
  update(
    tenantId: string,
    id: string,
    locale: string,
    update: Partial<Template>,
  ): Promise<Template> {
    throw new Error('Method not implemented.');
  }
  delete(tenantId: string, id: string, locale?: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  exists(tenantId: string, id: string, locale?: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
