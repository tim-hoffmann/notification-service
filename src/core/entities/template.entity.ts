import { AutoMap } from '@automapper/classes';
import { TransportType } from '../enums/transport-type.enum';
import { Base } from './base.entity';
import { TemplateLocale } from './template-locale.entity';

export class Template extends Base {
  @AutoMap() tenantId!: string;
  @AutoMap() name!: string;
  @AutoMap() from!: string;
  @AutoMap() dataSchema?: string;
  @AutoMap() transportType!: TransportType;
  @AutoMap() bcc?: string[];
  @AutoMap({ typeFn: () => TemplateLocale }) localeFields!: TemplateLocale;
}
