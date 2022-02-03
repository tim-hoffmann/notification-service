import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, Matches, ValidateIf } from 'class-validator';
import { TransportType } from '../../core/enums/transport-type.enum';
import { CreateTemplateDto } from './create-template.dto';

export class CreateTemplateLocaleDto {
  @AutoMap()
  @IsNotEmpty()
  @Matches(/^[A-Za-z]{2,4}([_-][A-Za-z]{4})?([_-]([A-Za-z]{2}|[0-9]{3}))?$/)
  locale!: string;

  @AutoMap()
  @IsNotEmpty()
  textTemplate!: string;

  @AutoMap()
  @ValidateIf((o: CreateTemplateDto) => o.transportType === TransportType.Email)
  htmlTemplate?: string;

  @AutoMap()
  @ValidateIf((o: CreateTemplateDto) => o.transportType === TransportType.Email)
  @IsNotEmpty()
  subjectTemplate?: string;
}
