import { AutoMap } from '@automapper/classes';
import { TransportType } from '../../../core/enums/transport-type.enum';
import { BaseDataModel } from './base.data';

export class TemplateMasterDataModel extends BaseDataModel {
  @AutoMap() id!: string;
  @AutoMap() name!: string;
  @AutoMap() from!: string;
  @AutoMap() transportType!: TransportType;
  @AutoMap() dataSchema?: string;
  @AutoMap() bcc?: string[];
}
