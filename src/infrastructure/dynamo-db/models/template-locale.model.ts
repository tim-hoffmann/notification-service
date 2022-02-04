import { AutoMap } from '@automapper/classes';
import { BaseModel } from './base.model';

export class TemplateLocaleModel extends BaseModel {
  @AutoMap() textTemplate!: string;
  @AutoMap() subjectTemplate?: string;
  @AutoMap() htmlTemplate?: string;
}
