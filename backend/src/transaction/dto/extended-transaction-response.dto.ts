import { ApiProperty } from '@nestjs/swagger';
import { CategoryResponseDto } from 'src/category/dto/category-response.dto';
import { TransactionResponseDto } from './transaction-response.dto';

export class ExtendedTransactionResponseDto extends TransactionResponseDto {
  @ApiProperty()
  readonly category: CategoryResponseDto;
}
