import { AutoMap } from '@automapper/classes';

export class Base {
  @AutoMap() id!: string;
  @AutoMap() updatedAt!: Date;
  @AutoMap() createdAt!: Date;
}
