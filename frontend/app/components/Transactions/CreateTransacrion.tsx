'use client';

import { CreateTransactionSchema } from '@/lib/types';
import { useCategoryStore } from '@/store/categoryStore';
import { useTransactionStore } from '@/store/transactionStore';
import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

export default function CreateTransaction() {
  const titleRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);

  const categories = useCategoryStore((state) => state.categories);
  const getCategories = useCategoryStore((state) => state.getCategories);
  const addTransaction = useTransactionStore((state) => state.addTransaction);

  const createTransaction = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const result = CreateTransactionSchema.safeParse(
      Object.fromEntries(formData)
    );

    if (!result.success) {
      let errorMessage = '';
      result.error.issues.forEach(
        (issue) => (errorMessage += `${issue.path[0]}: ${issue.message}. \n`)
      );
      toast.error(errorMessage);
      return;
    }

    addTransaction(result.data);

    if (titleRef.current && amountRef.current) {
      titleRef.current.value = '';
      amountRef.current.value = '';
    }
  };

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <form
      onSubmit={createTransaction}
      className='bg-widget flex h-48 w-[945px] flex-col items-center justify-between rounded-xl border-none p-3'
    >
      <p className='text-center text-xl'>New Transaction</p>

      <div className='flex w-full justify-around'>
        <div className='mt-4 flex flex-col gap-4'>
          <input
            type='text'
            name='title'
            ref={titleRef}
            placeholder='Title'
            className='h-8 rounded-md border border-gray-400 pl-2 text-sm italic'
          />

          <input
            type='number'
            min={1}
            name='amount'
            ref={amountRef}
            placeholder='Amount'
            className='h-8 rounded-md border border-gray-400 pl-2 text-sm italic'
          />
        </div>

        <div className='flex flex-col justify-center gap-2'>
          <label htmlFor='category'>
            <p className='text-center'>Category: </p>
            <select
              id='category'
              name='category'
              className='bg-customBlue h-8 w-full rounded-md px-2 text-sm focus:ring-blue-500'
              required
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </label>

          <div>
            <p className='text-center'>Type:</p>
            <label className='mr-2'>
              <input type='radio' name='type' value={'INCOME'} className='' />
              <span className='ml-1'>Income</span>
            </label>
            <label>
              <input type='radio' name='type' value={'EXPENSE'} className='' />
              <span className='ml-1'>Expense</span>
            </label>
          </div>
        </div>
      </div>

      <button
        type='submit'
        className='bg-customBlue text-md -mt-3 cursor-pointer rounded-md px-6 py-2 duration-500 hover:bg-blue-600'
      >
        Create
      </button>
    </form>
  );
}
