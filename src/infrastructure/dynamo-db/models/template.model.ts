import { AutoMap } from '@automapper/classes';
import { TransportType } from '../../../core/enums/transport-type.enum';
import { BaseModel } from './base.model';

export class TemplateModel extends BaseModel {
  @AutoMap() name!: string;
  @AutoMap() from!: string;
  @AutoMap() transportType!: TransportType;
  @AutoMap() dataSchema?: string;
  @AutoMap() bcc?: string[];
}
