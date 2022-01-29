import { TransportType } from '../enums/transport-type.enum';
import { Base } from './base.entity';

export class BaseNotification<TTransport> extends Base {
  tenantId!: string;
  to!: string;
  data?: Record<string, unknown>;
  locale!: string;
  templateId!: string;
  transportType!: TTransport;
}

export class EmailNotification<TTransport> extends BaseNotification<TTransport> {
  bcc?: string[];
}

export class SmsNotification<T> extends BaseNotification<T> {}

export type Notification<TTransport = TransportType> = TTransport extends TransportType.Email
  ? EmailNotification<TTransport>
  : SmsNotification<TTransport>;
