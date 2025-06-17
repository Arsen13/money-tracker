import { ApiProperty } from '@nestjs/swagger';

export class FindTransactionByMonthDto {
  @ApiProperty()
  readonly period: string;

  @ApiProperty()
  readonly income: number;

  @ApiProperty()
  readonly expense: number;
}
