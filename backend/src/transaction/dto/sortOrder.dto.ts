import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';

export class SortOrderDto {
  @ApiProperty()
  @IsIn(['asc', 'desc'])
  sortOrder: string;
}
