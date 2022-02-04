import { AutoMap } from '@automapper/classes';
import { TransportType } from '../enums/transport-type.enum';
import { Base } from './base.entity';

export class Template extends Base {
  @AutoMap() tenantId!: string;
  @AutoMap() name!: string;
  @AutoMap() from!: string;
  @AutoMap() dataSchema?: string;
  @AutoMap() transportType!: TransportType;
  @AutoMap({ typeFn: () => TemplateLocale }) locales?: TemplateLocale[];
  @AutoMap() bcc?: string[];
}

export class TemplateLocale extends Base {
  @AutoMap() textTemplate!: string;
  @AutoMap() htmlTemplate?: string;
  @AutoMap() subjectTemplate?: string;
}
