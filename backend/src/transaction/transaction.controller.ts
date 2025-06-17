import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from '@prisma/client';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { SortByDto } from './dto/sortBy.dto';
import { SortOrderDto } from './dto/sortOrder.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ExtendedTransactionResponseDto } from './dto/extended-transaction-response.dto';
import { TransactionResponseDto } from './dto/transaction-response.dto';
import { DeleteTransactionResponseDto } from './dto/delete-transaction.dto';
import { FindGraphDataDto } from './dto/transaction-graphics.dto';
import { FindTransactionByMonthDto } from './dto/transaction-by-month.dto';
import { TotalTransactionCountDto } from './dto/transaction-total-count.dto';

@ApiTags('Transaction')
@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiOperation({ summary: 'Used to create a new transaction' })
  @ApiCreatedResponse({
    description: 'Transaction created',
    type: ExtendedTransactionResponseDto,
  })
  @Post()
  @UsePipes(new ValidationPipe())
  create(
    @Body() createTransactionDto: CreateTransactionDto,
    @Req() req,
  ): Promise<Transaction> {
    return this.transactionService.create(createTransactionDto, +req.user.id);
  }

  @ApiOperation({ summary: 'Used to find all transactions' })
  @ApiCreatedResponse({
    description: 'Transactions found',
    type: TransactionResponseDto,
    isArray: true,
  })
  @Get()
  findAll(@Req() req): Promise<Transaction[]> {
    return this.transactionService.findAll(+req.user.id);
  }

  @ApiOperation({ summary: 'Used to update a transaction' })
  @ApiCreatedResponse({
    description: 'Transaction updated',
    type: ExtendedTransactionResponseDto,
  })
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  update(
    @Body() updateTransactionDto: UpdateTransactionDto,
    @Param('id', ParseIntPipe) transactionId: number,
    @Req() req,
  ): Promise<Transaction> {
    return this.transactionService.update(
      updateTransactionDto,
      transactionId,
      +req.user.id,
    );
  }

  @ApiOperation({ summary: 'Used to delete a transaction' })
  @ApiCreatedResponse({
    description: 'Transaction deleted',
    type: DeleteTransactionResponseDto,
  })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) transactionId: number, @Req() req) {
    return this.transactionService.remove(transactionId, +req.user.id);
  }

  @ApiOperation({ summary: 'Used to get transactions with pagination' })
  @ApiCreatedResponse({
    description: 'Transactions found',
    type: ExtendedTransactionResponseDto,
    isArray: true,
  })
  @Get('pagination')
  @UsePipes(new ValidationPipe())
  findAllWithPagination(
    @Req() req,
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query(new ValidationPipe({ transform: true })) sortBy: SortByDto,
    @Query(new ValidationPipe({ transform: true })) sortOrder: SortOrderDto,
  ) {
    return this.transactionService.findAllWithPagination(
      +req.user.id,
      page,
      limit,
      sortBy.sortBy,
      sortOrder.sortOrder,
    );
  }

  @ApiOperation({
    summary: 'Used to get information about about incomes and expenses',
  })
  @ApiCreatedResponse({
    description: 'Income and Expense data found',
    type: FindGraphDataDto,
  })
  @Get('graphics')
  findGraphicsData(@Req() req) {
    return this.transactionService.findGraphicsData(+req.user.id);
  }

  @ApiOperation({ summary: 'Used to search for transactions by month' })
  @ApiCreatedResponse({
    description: 'Transactions found and grouped by month',
    type: FindTransactionByMonthDto,
  })
  @Get('groupBy')
  @UsePipes(new ValidationPipe())
  findTransactionByPeriod(@Req() req) {
    return this.transactionService.findTransactionByPeriod(+req.user.id);
  }

  @ApiOperation({ summary: 'Used to find total count of transactions' })
  @ApiCreatedResponse({
    description: 'Total count of transaction calculated',
    type: TotalTransactionCountDto,
    isArray: true,
  })
  @Get('total')
  findTotalCountOfTransaction(@Req() req) {
    return this.transactionService.findTotalCountOfTransaction(+req.user.id);
  }

  @ApiOperation({ summary: 'Used to find the last transaction' })
  @ApiCreatedResponse({ description: 'Last transaction found' })
  @Get('last')
  findLastTransactions(@Req() req) {
    return this.transactionService.findLastTransactions(+req.user.id);
  }
}
