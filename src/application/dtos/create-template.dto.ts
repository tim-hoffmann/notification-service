import { AutoMap } from '@automapper/classes';
import { IsEnum, IsNotEmpty, IsOptional, ValidateIf } from 'class-validator';
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
