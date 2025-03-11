import { IsIn } from "class-validator";

export class SortOrderDto {
    @IsIn(['asc', 'desc'])
    sortOrder: string;
}