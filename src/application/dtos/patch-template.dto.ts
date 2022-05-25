import { AutoMap } from '@automapper/classes';
import { IsByteLength, IsEnum, IsNotEmpty, IsOptional, Matches } from 'class-validator';
import { TransportType } from '../../core/enums/transport-type.enum';

export class PatchTemplateDto {
  @AutoMap()
  @IsNotEmpty()
  name?: string;

  @AutoMap()
  @IsNotEmpty()
  from?: string;

  @AutoMap()
  @IsOptional()
  dataSchema?: string;

  @AutoMap()
  @IsNotEmpty()
  @IsEnum(TransportType)
  transportType?: TransportType;

  @AutoMap()
  bcc?: string[];

  @AutoMap()
  @IsNotEmpty()
  textTemplate?: string;

  @AutoMap()
  @IsOptional()
  @IsByteLength(0, 256000)
  htmlTemplate?: string;

  @AutoMap()
  @IsOptional()
  subjectTemplate?: string;

  @AutoMap()
  @IsOptional()
  @Matches(/^[A-Za-z]{2,4}([_-][A-Za-z]{4})?([_-]([A-Za-z]{2}|[0-9]{3}))?$/)
  locale?: string;
}
