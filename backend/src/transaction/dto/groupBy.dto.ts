import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsString } from 'class-validator';
import { TPeriod } from 'src/types/types';

export class GroupByDto {
  @ApiProperty()
  @IsString()
  @IsIn(['week', 'month', 'year'])
  readonly period: TPeriod;
}
