import { Model } from '@shiftcoders/dynamo-easy';
import { TemplateMasterDataModel } from './templateMaster.data';

@Model({ tableName: process.env.DYNAMO_DB_TABLE })
export class TemplateDataModel extends TemplateMasterDataModel {
  id!: string;
  locale!: string;
  textTemplate!: string;
  subjectTemplate?: string;
  htmlTemplate?: string;
}
