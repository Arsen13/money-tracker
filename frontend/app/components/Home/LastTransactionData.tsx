'use client';

import { axiosInstance } from "@/lib/axiosInstance";
import { useEffect, useState } from "react";

type lastTransactionT = {
    income: {
        amount: number;
        category: string;
    };
    expense: {
        amount: number;
        category: string;
    }
}

export default function LastTransactionData() {

    const [lastTransaction, setLastTransaction] = useState<lastTransactionT>();

    useEffect(() => {
        async function getLastTransactions() {
            const res = await axiosInstance.get('transactions/last');
            setLastTransaction(res.data);
        }

        getLastTransactions();
    }, [])

    return (
        <div className="flex justify-around">
            <div className="bg-linear-to-b from-cyan-500 to-blue-500 flex flex-col items-center gap-0.5 px-7 py-0.5 rounded-xl">
                <p className="text-sm">Income</p>
                <p className="text-2xl">{lastTransaction?.income.amount || 0}</p>
                <p className="text-sm italic">{lastTransaction?.income.category?.toLowerCase() || ''}</p>
            </div>
            <div className="bg-linear-to-b from-violet-500 to-fuchsia-500 flex flex-col items-center gap-0.5 px-7 py-0.5 rounded-xl">
                <p className="text-sm">Expense</p>
                <p className="text-2xl">{lastTransaction?.expense.amount || 0}</p>
                <p className="text-sm italic">{lastTransaction?.expense.category?.toLowerCase() || ''}</p>
            </div>
        </div>
    )
}