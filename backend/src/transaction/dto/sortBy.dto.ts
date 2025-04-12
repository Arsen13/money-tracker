import { IsIn } from "class-validator";

export class SortByDto {
    @IsIn(['amount', 'type', 'createdAt', 'id'])
    sortBy: string
}