import { TransportType } from '../enums/transport-type.enum';
import { Notification } from './notification.entity';

export class Email extends Notification {
  bcc?: string[];
  transportType = TransportType.Email;
}
