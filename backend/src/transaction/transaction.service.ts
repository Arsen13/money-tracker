import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { Transaction } from "@prisma/client";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";

@Injectable()
export class TransactionService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createTransactionDto: CreateTransactionDto, userId: number): Promise<Transaction> {
        return await this.prisma.transaction.create({
            data: {
                userId,
                categoryId: createTransactionDto.category,
                title: createTransactionDto.title,
                type: createTransactionDto.type,
                amount: createTransactionDto.amount
            }
        })
    }

    async findAll(userId: number): Promise<Transaction[]> {
        return await this.prisma.transaction.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });
    }

    async update(updateTransactionDto: UpdateTransactionDto, transactionId: number, userId: number): Promise<Transaction> {
        const transaction = await this.prisma.transaction.findFirst({
            where: {
                id: transactionId,
                userId
            }
        });

        if (!transaction) throw new NotFoundException('Transaction not found');

        return await this.prisma.transaction.update({
            where: {
                id: transactionId,
                userId,
            }, 
            data: updateTransactionDto,
        })
    }

    async remove(transactionId: number, userId: number) {
        const transaction = await this.prisma.transaction.findFirst({
            where: {
                id: transactionId,
                userId,
            }
        });

        if (!transaction) throw new NotFoundException('Transaction not found');

        await this.prisma.transaction.delete({
            where: {
                id: transactionId,
                userId,
            }
        });

        return { message: "Transaction was successfully deleted" };
    }
}