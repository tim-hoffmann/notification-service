import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  first?: number;

  @IsOptional()
  before?: string;

  @IsOptional()
  after?: string;
}
