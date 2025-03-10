import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { Transaction } from "@prisma/client";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";

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
}