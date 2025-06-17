import { ApiProperty } from '@nestjs/swagger';

export class FindGraphDataDto {
  @ApiProperty()
  readonly income: number;

  @ApiProperty()
  readonly expense: number;
}
