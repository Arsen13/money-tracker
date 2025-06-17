import { ApiProperty } from '@nestjs/swagger';

export class TotalTransactionCountDto {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly value: number;
}
