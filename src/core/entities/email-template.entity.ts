import { Template } from './template.entity';

export class EmailTemplate extends Template {
  htmlTemplate: string;
  subjectTemplate: string;
  bcc?: string[];
}
