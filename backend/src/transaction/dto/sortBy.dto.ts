import { IsIn } from "class-validator";

export class SortByDto {
    @IsIn(['amount', 'type', 'createdAt'])
    sortBy: string
}