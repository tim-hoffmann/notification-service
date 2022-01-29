import { TransportType } from '../enums/transport-type.enum';
import { Base } from './base.entity';

export class BaseTemplate<TTransport> extends Base {
  tenantId!: string;
  name!: string;
  from!: string;
  dataSchema?: string;
  transportType!: TTransport;
  textTemplate!: string;
  locale!: string;
}

export class EmailTemplate<TTransport> extends BaseTemplate<TTransport> {
  htmlTemplate!: string;
  subjectTemplate!: string;
  bcc?: string[];
}

export class SmsTemplate<TTransport> extends BaseTemplate<TTransport> {}

export type Template<TTransport = TransportType> = TTransport extends TransportType.Email
  ? EmailTemplate<TTransport>
  : SmsTemplate<TTransport>;
