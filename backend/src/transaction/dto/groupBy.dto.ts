import { IsIn, IsString } from "class-validator";
import { TPeriod } from "src/types/types";

export class GroupByDto {
    @IsString()
    @IsIn(["week", "month", "year"])
    readonly period: TPeriod;
}