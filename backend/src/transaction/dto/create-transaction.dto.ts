import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTransactionDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsString()
    type: 'EXPENSE' | 'INCOME';

    @IsNotEmpty()
    category: number;
}