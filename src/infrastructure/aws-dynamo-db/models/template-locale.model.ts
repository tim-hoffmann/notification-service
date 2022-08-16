import { AutoMap } from '@automapper/classes';
import { TemplateModel } from './template.model';

export class TemplateLocaleModel extends TemplateModel {
  @AutoMap() locale!: string;
  @AutoMap() textTemplate!: string;
  @AutoMap() subjectTemplate?: string;
  @AutoMap() htmlTemplate?: string;
}
