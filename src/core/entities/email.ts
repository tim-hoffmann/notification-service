import { Base } from './base';

export class Email extends Base {
  tenantId: string;
  to: string;
  data: Record<string, unknown>;
  locale: string;
  templateId: string;
  bcc?: string[];
}
