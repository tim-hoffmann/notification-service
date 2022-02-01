import { AutoMap } from '@automapper/classes';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TransportType } from '../../core/enums/transport-type.enum';

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
  @IsNotEmpty()
  textTemplate!: string;

  @AutoMap()
  htmlTemplate!: string;

  @AutoMap()
  subjectTemplate!: string;

  @AutoMap()
  bcc?: string[];
}
