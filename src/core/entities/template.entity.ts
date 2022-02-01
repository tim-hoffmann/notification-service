import { AutoMap } from '@automapper/classes';
import { TransportType } from '../enums/transport-type.enum';
import { Base } from './base.entity';

export class Template extends Base {
  @AutoMap() tenantId!: string;
  @AutoMap() name!: string;
  @AutoMap() from!: string;
  @AutoMap() dataSchema?: string;
  @AutoMap() transportType!: TransportType;
  @AutoMap() textTemplate!: string;
  @AutoMap() locale!: string;
  @AutoMap() htmlTemplate?: string;
  @AutoMap() subjectTemplate?: string;
  @AutoMap() bcc?: string[];
}
