import { ApiProperty } from '@nestjs/swagger';

export class TransactionResponseDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly userId: number;

  @ApiProperty()
  readonly categoryId: number;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly type: 'EXPENSE' | 'INCOME';

  @ApiProperty()
  readonly amount: number;

  @ApiProperty()
  readonly createdAt: string;

  @ApiProperty()
  readonly updatedAt: string;
}
