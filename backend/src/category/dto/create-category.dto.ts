import { User } from "@prisma/client";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty()
    readonly title: string;

    @IsOptional()
    readonly user?: User;
}