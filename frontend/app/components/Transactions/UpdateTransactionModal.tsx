'use client';

import { UpdateTransactionSchema } from '@/lib/types';
import { useTransactionStore } from '@/store/transactionStore';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { IoClose } from 'react-icons/io5';

export default function UpdateTransactionModal() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateTransaction = useTransactionStore(
    (state) => state.updateTransaction
  );

  const id = searchParams.get('id');
  const title = searchParams.get('title');
  const amount = searchParams.get('amount');

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const result = UpdateTransactionSchema.safeParse(
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
    if (!id) {
      toast.error('Missing category ID');
      return;
    }

    updateTransaction(id, result.data);
    router.back();
    toast.success('Transaction was successfully updated');
  };

  return (
    <div className='fixed inset-0 flex h-full w-full items-center justify-center overflow-y-auto bg-black/60'>
      <div className='bg-widget relative w-96 rounded-md p-8 shadow-lg'>
        <div className='text-center'>
          <h3 className='text-2xl font-bold text-white'>Update transaction</h3>
          <div className='mt-2 px-7 py-3'>
            <form className='flex flex-col gap-2.5' onSubmit={handleUpdate}>
              <input
                type='text'
                name='title'
                defaultValue={String(title)}
                placeholder='Title'
                className='h-10 w-64 rounded-md border border-gray-400 pl-2 text-sm italic'
              />

              <input
                type='number'
                min={1}
                name='amount'
                defaultValue={Number(amount)}
                placeholder='Amount'
                className='h-10 w-64 rounded-md border border-gray-400 pl-2 text-sm italic'
              />

              <div>
                <p className='text-center'>Type:</p>
                <label className='mr-2'>
                  <input
                    type='radio'
                    name='type'
                    value={'INCOME'}
                    className=''
                  />
                  <span className='ml-1'>Income</span>
                </label>
                <label>
                  <input
                    type='radio'
                    name='type'
                    value={'EXPENSE'}
                    className=''
                  />
                  <span className='ml-1'>Expense</span>
                </label>
              </div>

              <button
                type='submit'
                className='bg-customBlue text-md mt-6 cursor-pointer rounded-md px-6 py-2 duration-500 hover:bg-blue-600'
              >
                Update
              </button>
            </form>
            <div className='absolute top-2 right-2'>
              <IoClose
                onClick={router.back}
                className='h-6 w-6 cursor-pointer duration-500 hover:text-red-500'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
