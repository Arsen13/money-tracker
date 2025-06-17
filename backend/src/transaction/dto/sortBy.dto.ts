import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';

export class SortByDto {
  @ApiProperty()
  @IsIn(['amount', 'type', 'createdAt', 'id'])
  sortBy: string;
}
