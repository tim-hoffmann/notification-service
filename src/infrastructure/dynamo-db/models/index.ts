import { TemplateDataModel } from './template.data';
import { TemplateMasterDataModel } from './templateMaster.data';

export enum ModelType {
  TEMPLATE_MASTER = 'TEMPLATE_MASTER',
  TEMPLATE = 'TEMPLATE',
}

export const READ_ALL_INDEX = 'ReadAllIndex';

export type NotificationStoreDataModel = TemplateMasterDataModel | TemplateDataModel;
