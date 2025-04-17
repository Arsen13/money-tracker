'use client';

import { useTransactionStore } from '@/store/transactionStore';
import Transaction from './Transaction';
import { useEffect } from 'react';
import TransactionSkeleton from '../skeletons/TransactionSkeleton';

export default function TransactionList() {
  const transactions = useTransactionStore((state) => state.transactions);
  const getTransactions = useTransactionStore((state) => state.getTransactions);
  const incrementPage = useTransactionStore((state) => state.incrementPage);
  const decrementPage = useTransactionStore((state) => state.decrementPage);
  const deleteTransaction = useTransactionStore(
    (state) => state.deleteTransaction
  );

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div className='bg-widget relative h-96 w-[945px] rounded-xl border-none p-3'>
      <h3 className='text-xl'>Transactions</h3>
      <div className='mt-3 mb-2 flex flex-col gap-3'>
        {transactions.length <= 0 ? (
          <TransactionSkeleton />
        ) : (
          transactions.map((transaction) => (
            <Transaction
              key={transaction.id}
              id={transaction.id}
              title={transaction.title}
              category={transaction.category.title}
              amount={transaction.amount}
              type={transaction.type}
              date={transaction.createdAt}
              deleteTransaction={deleteTransaction}
            />
          ))
        )}
      </div>
      <div className='absolute right-106 bottom-2 flex justify-center gap-4'>
        <button
          onClick={decrementPage}
          className='bg-customBlue cursor-pointer rounded-md px-2 py-1 text-sm duration-750 hover:bg-blue-600'
        >
          Prev
        </button>
        <button
          onClick={incrementPage}
          className='bg-customBlue cursor-pointer rounded-md px-2 py-1 text-sm duration-750 hover:bg-blue-600'
        >
          Next
        </button>
      </div>
    </div>
  );
}
