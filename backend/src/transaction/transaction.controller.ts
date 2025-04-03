import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { Transaction } from "@prisma/client";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import { SortByDto } from "./dto/sortBy.dto";
import { SortOrderDto } from "./dto/sortOrder.dto";
import { GroupByDto } from "./dto/groupBy.dto";

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    create(
        @Body() createTransactionDto: CreateTransactionDto,
        @Req() req
    ): Promise<Transaction> {
        return this.transactionService.create(createTransactionDto, +req.user.id);
    }

    @Get()
    findAll(@Req() req): Promise<Transaction[]> {
        return this.transactionService.findAll(+req.user.id);
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    update(
        @Body() updateTransactionDto: UpdateTransactionDto,
        @Param('id', ParseIntPipe) transactionId: number,
        @Req() req
    ): Promise<Transaction> {
        return this.transactionService.update(updateTransactionDto, transactionId, +req.user.id);
    }

    @Delete(':id')
    delete(
        @Param('id', ParseIntPipe) transactionId: number,
        @Req() req
    ) {
        return this.transactionService.remove(transactionId, +req.user.id);
    }

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
            sortOrder.sortOrder
        );
    }

    @Get('graphics')
    findGraphicsData(@Req() req) {
        return this.transactionService.findGraphicsData(+req.user.id);
    }

    @Get('groupBy')
    @UsePipes(new ValidationPipe())
    findTransactionByPeriod(
        @Req() req,
        @Body() groupByDto: GroupByDto
    ) {
        return this.transactionService.findTransactionByPeriod(+req.user.id, groupByDto.period);
    }

    @Get('total')
    findTotalCountOfTransaction(@Req() req) {
        return this.transactionService.findTotalCountOfTransaction(+req.user.id);
    }
}