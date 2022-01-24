import { TransportType } from '../enums/transport-type.enum';
import { Notification } from './notification.entity';

export class Sms extends Notification {
  transportType = TransportType.Sms;
}
