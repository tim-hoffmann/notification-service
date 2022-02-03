import { AutoMap } from '@automapper/classes';
import { IsEnum, IsNotEmpty, IsOptional, Matches, ValidateIf } from 'class-validator';
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
  @Matches(/^[A-Za-z]{2,4}([_-][A-Za-z]{4})?([_-]([A-Za-z]{2}|[0-9]{3}))?$/)
  @IsOptional()
  locale?: string;

  @AutoMap()
  @ValidateIf((o: CreateTemplateDto) => o.transportType === TransportType.Email)
  htmlTemplate?: string;

  @AutoMap()
  @ValidateIf((o: CreateTemplateDto) => o.transportType === TransportType.Email)
  @IsNotEmpty()
  subjectTemplate?: string;

  @AutoMap()
  bcc?: string[];
}
