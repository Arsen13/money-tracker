export interface IUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
}

export type TPeriod = 'week' | 'month' | 'year';

export type TTransactionByPeriod = { 
    period: Date;
    type: "INCOME" | "EXPENSE";
    total: number;
} [];

export type TTransactionByPeriodMap = { 
    period: string;
    income: number;
    expense: number;
};