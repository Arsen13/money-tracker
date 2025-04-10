'use client';

import { useTransactionStore } from "@/store/transactionStore";
import Transaction from "./Transaction";
import { useEffect } from "react";

export default function TransactionList() {

	const transactions = useTransactionStore((state) => state.transactions);
	const getTransactions = useTransactionStore((state) => state.getTransactions);

	useEffect(() => {
		getTransactions();
	}, [])

	return (
		<div className="w-[945px] bg-widget border-none h-96 rounded-xl p-3">
			<h3 className="text-xl">Transactions</h3>
			<div className="mt-3 mb-2 flex flex-col gap-3">
				{transactions.length <= 0
					? (<div className="text-2xl mt-26">
						You don't have transactions
					</div>)
					: transactions.map((transaction) => (
						<Transaction 
							key={transaction.id}
							id={transaction.id}
							title={transaction.title}
							category={transaction.category.title}
							amount={transaction.amount}
							type={transaction.type}
							date={transaction.createdAt}
						/>
					))
				}
			</div>
			<div className="flex justify-center gap-4">
				<button className="bg-customBlue text-sm px-2 py-1 rounded-md cursor-pointer hover:bg-orange-300 hover:text-widget duration-750">
					Prev
				</button>
				<button className="bg-customBlue text-sm px-2 py-1 rounded-md cursor-pointer hover:bg-orange-300 hover:text-widget duration-750">
					Next
				</button>
			</div>
		</div>
	)
}