import { Base } from './base.entity';

export class BaseNotification<TTransport> extends Base {
  tenantId!: string;
  to!: string;
  data?: Record<string, unknown>;
  locale!: string;
  templateId!: string;
  transportType!: TTransport;
  bcc?: string[];
}
