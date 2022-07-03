import { AutoMap } from '@automapper/classes';
import { IsByteLength, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
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

  @AutoMap(() => [String])
  bcc?: string[];

  @AutoMap()
  @IsNotEmpty()
  textTemplate!: string;

  @AutoMap()
  @IsOptional()
  @IsByteLength(0, 256000)
  htmlTemplate?: string;

  @AutoMap()
  @IsOptional()
  subjectTemplate?: string;
}
