import { TransportType } from '../enums/transport-type.enum';
import { Base } from './base.entity';

export class Notification extends Base {
  tenantId: string;
  to: string;
  data: Record<string, unknown>;
  locale: string;
  templateId: string;
  transportType: TransportType;
}
