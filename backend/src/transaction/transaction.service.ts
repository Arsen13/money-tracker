import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from '@prisma/client';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TTransactionByPeriod, TTransactionByPeriodMap } from 'src/types/types';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createTransactionDto: CreateTransactionDto,
    userId: number,
  ): Promise<Transaction> {
    return await this.prisma.transaction.create({
      data: {
        userId,
        categoryId: createTransactionDto.category,
        title: createTransactionDto.title,
        type: createTransactionDto.type,
        amount: createTransactionDto.amount,
      },
      include: {
        category: true,
      },
    });
  }

  async findAll(userId: number): Promise<Transaction[]> {
    return await this.prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAllWithPagination(
    userId: number,
    page: number,
    limit: number,
    sortBy: string,
    sortOrder: string,
  ): Promise<Transaction[]> {
    return await this.prisma.transaction.findMany({
      where: { userId },
      orderBy: { [sortBy]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        category: true,
      },
    });
  }

  async findGraphicsData(userId: number) {
    const result = await this.prisma.transaction.groupBy({
      where: {
        userId,
      },
      by: ['type'],
      _sum: {
        amount: true,
      },
    });

    return {
      income: result[0]._sum.amount,
      expense: result[1]._sum.amount,
    };
  }

  async findTransactionByPeriod(userId: number) {
    const transactionsData: TTransactionByPeriod = await this.prisma.$queryRaw`
            SELECT 
                DATE_TRUNC(${'month'}, "createdAt") as period,
                type,
                SUM(amount) as total
            FROM "Transaction"
            WHERE "userId"=${userId}
            GROUP BY period, type
            ORDER BY period desc
            LIMIT 6`;

    const resultMap = new Map<string, TTransactionByPeriodMap>();

    for (let item of transactionsData) {
      const date = new Date(item.period).toLocaleString('en-US', {
        month: 'long',
      });

      if (!resultMap.has(date)) {
        resultMap.set(date, { period: date, income: 0, expense: 0 });
      }

      let current = resultMap.get(date)!;

      if (item.type == 'INCOME') current.income += item.total;
      else if (item.type == 'EXPENSE') current.expense += item.total;
    }

    return Array.from(resultMap.values()).reverse();
  }

  async findTotalCountOfTransaction(userId: number) {
    const totalTransactions = await this.prisma.transaction.groupBy({
      by: ['type'],
      _count: {
        amount: true,
      },
      where: {
        userId,
      },
    });

    return [
      {
        name: 'Income',
        value: totalTransactions[0]?._count.amount || 0,
      },
      {
        name: 'Expense',
        value: totalTransactions[1]?._count.amount || 0,
      },
    ];
  }

  async findLastTransactions(userId: number) {
    const incomeTransaction = await this.prisma.transaction.findFirst({
      where: {
        userId,
        type: 'INCOME',
      },
      orderBy: [{ createdAt: 'desc' }],
      include: {
        category: true,
      },
    });

    const expenseTransaction = await this.prisma.transaction.findFirst({
      where: {
        userId,
        type: 'EXPENSE',
      },
      orderBy: [{ createdAt: 'desc' }],
      include: {
        category: true,
      },
    });

    return {
      income: {
        amount: incomeTransaction?.amount,
        category: incomeTransaction?.category?.title,
      },
      expense: {
        amount: expenseTransaction?.amount,
        category: expenseTransaction?.category?.title,
      },
    };
  }

  async update(
    updateTransactionDto: UpdateTransactionDto,
    transactionId: number,
    userId: number,
  ): Promise<Transaction> {
    const transaction = await this.prisma.transaction.findFirst({
      where: {
        id: transactionId,
        userId,
      },
    });

    if (!transaction) throw new NotFoundException('Transaction not found');

    return await this.prisma.transaction.update({
      where: {
        id: transactionId,
        userId,
      },
      data: updateTransactionDto,
      include: {
        category: true,
      },
    });
  }

  async remove(transactionId: number, userId: number) {
    const transaction = await this.prisma.transaction.findFirst({
      where: {
        id: transactionId,
        userId,
      },
    });

    if (!transaction) throw new NotFoundException('Transaction not found');

    await this.prisma.transaction.delete({
      where: {
        id: transactionId,
        userId,
      },
    });

    return { message: 'Transaction was successfully deleted' };
  }
}
