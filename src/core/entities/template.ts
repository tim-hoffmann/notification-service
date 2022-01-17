import { Base } from './base';

export class Template extends Base {
  tenantId: string;
  name: string;
  from: string;
  textTemplate: string;
  htmlTemplate: string;
  subjectTemplate: string;
  locale: string;
  dataSchema?: string;
  bcc?: string[];
}
