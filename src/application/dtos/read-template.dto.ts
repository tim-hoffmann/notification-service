import { AutoMap } from '@automapper/classes';
import { TransportType } from '../../core/enums/transport-type.enum';

export class ReadTemplateDto {
  @AutoMap() id!: string;
  @AutoMap() name!: string;
  @AutoMap() from!: string;
  @AutoMap() dataSchema?: string;
  @AutoMap() transportType!: TransportType;
  @AutoMap() bcc?: string[];
  @AutoMap() locale!: string;
  @AutoMap() textTemplate!: string;
  @AutoMap() htmlTemplate?: string;
  @AutoMap() subjectTemplate?: string;
}
