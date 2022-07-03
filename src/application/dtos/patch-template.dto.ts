import { AutoMap } from '@automapper/classes';
import { IsByteLength, IsEnum, IsOptional } from 'class-validator';
import { TransportType } from '../../core/enums/transport-type.enum';

export class PatchTemplateDto {
  @AutoMap()
  @IsOptional()
  name?: string;

  @AutoMap()
  @IsOptional()
  from?: string;

  @AutoMap()
  @IsOptional()
  dataSchema?: string;

  @AutoMap()
  @IsOptional()
  @IsEnum(TransportType)
  transportType?: TransportType;

  @AutoMap(() => [String])
  @IsOptional()
  bcc?: string[];

  @AutoMap()
  @IsOptional()
  textTemplate?: string;

  @AutoMap()
  @IsOptional()
  @IsByteLength(0, 256000)
  htmlTemplate?: string;

  @AutoMap()
  @IsOptional()
  subjectTemplate?: string;
}
