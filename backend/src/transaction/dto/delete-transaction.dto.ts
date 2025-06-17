import { ApiProperty } from '@nestjs/swagger';

export class DeleteTransactionResponseDto {
  @ApiProperty()
  readonly message: string;
}
