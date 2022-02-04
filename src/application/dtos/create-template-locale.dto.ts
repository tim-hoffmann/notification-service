import { AutoMap } from '@automapper/classes';
import { IsByteLength, IsNotEmpty, IsOptional, Matches } from 'class-validator';

export class CreateTemplateLocaleDto {
  @AutoMap()
  @IsNotEmpty()
  @Matches(/^[A-Za-z]{2,4}([_-][A-Za-z]{4})?([_-]([A-Za-z]{2}|[0-9]{3}))?$/)
  locale!: string;

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
