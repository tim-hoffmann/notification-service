import { AutoMap } from '@automapper/classes';
import { IsArray, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TransportType } from '../../core/enums/transport-type.enum';
import { CreateTemplateLocaleDto } from './create-template-locale.dto';

export class CreateTemplateDto {
  @AutoMap()
  @IsNotEmpty()
  name!: string;

  @AutoMap()
  @IsNotEmpty()
  from!: string;

  @AutoMap()
  @IsOptional()
  dataSchema?: string;

  @AutoMap()
  @IsNotEmpty()
  @IsEnum(TransportType)
  transportType!: TransportType;

  @AutoMap()
  bcc?: string[];

  @AutoMap({ typeFn: () => CreateTemplateLocaleDto })
  @IsNotEmpty()
  @IsArray()
  locales!: CreateTemplateLocaleDto[];
}
