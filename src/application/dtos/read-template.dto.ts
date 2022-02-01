import { AutoMap } from '@automapper/classes';
import { CreateTemplateDto } from './create-template.dto';

export class ReadTemplateDto extends CreateTemplateDto {
  @AutoMap() id!: string;
}
