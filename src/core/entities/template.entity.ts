import { TransportType } from '../enums/transport-type.enum';
import { Base } from './base.entity';

export class Template extends Base {
  tenantId: string;
  name: string;
  from: string;
  textTemplate: string;
  locale: string;
  dataSchema?: string;
  transportType: TransportType;
}
