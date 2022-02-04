import { AutoMap } from '@automapper/classes';
import { TransportType } from '../../core/enums/transport-type.enum';
import { ReadTemplateLocaleDto } from './read-template-locale.dto';

export class ReadTemplateDto {
  @AutoMap() id!: string;
  @AutoMap() name!: string;
  @AutoMap() from!: string;
  @AutoMap() dataSchema?: string;
  @AutoMap() transportType!: TransportType;
  @AutoMap() bcc?: string[];
  @AutoMap({ typeFn: () => ReadTemplateLocaleDto }) locales!: ReadTemplateLocaleDto[];
}
