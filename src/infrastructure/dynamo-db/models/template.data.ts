import { AutoMap } from '@automapper/classes';
import { TemplateMasterDataModel } from './templateMaster.data';

export class TemplateDataModel extends TemplateMasterDataModel {
  @AutoMap() locale!: string;
  @AutoMap() textTemplate!: string;
  @AutoMap() subjectTemplate?: string;
  @AutoMap() htmlTemplate?: string;
}
