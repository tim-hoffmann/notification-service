import { AutoMap } from '@automapper/classes';
import { ModelType } from '../enums/model-type.enum';

export class BaseModel {
  @AutoMap() id!: string;
  @AutoMap() tenantId!: string;
  itemKey!: string;
  gsiSortKey!: string;
  createdAt!: string;
  updatedAt!: string;
  type!: ModelType;
}
