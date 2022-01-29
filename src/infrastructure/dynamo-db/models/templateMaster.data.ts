import { Model } from '@shiftcoders/dynamo-easy';
import { TransportType } from '../../../core/enums/transport-type.enum';
import { BaseDataModel } from './base.data';

@Model({ tableName: process.env.DYNAMO_DB_TABLE })
export class TemplateMasterDataModel extends BaseDataModel {
  id!: string;
  name!: string;
  from!: string;
  transportType!: TransportType;
  dataSchema?: string;
  bcc?: string[];
}
