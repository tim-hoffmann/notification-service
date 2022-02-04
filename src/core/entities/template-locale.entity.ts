import { AutoMap } from '@automapper/classes';

export class TemplateLocale {
  @AutoMap() locale!: string;
  @AutoMap() textTemplate!: string;
  @AutoMap() htmlTemplate?: string;
  @AutoMap() subjectTemplate?: string;
}
