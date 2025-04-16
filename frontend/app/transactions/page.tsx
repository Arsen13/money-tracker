import { SearchParamProps } from '@/lib/types';
import Navbar from '../components/Nav/Navbar';
import CreateTransaction from '../components/Transactions/CreateTransacrion';
import TransactionList from '../components/Transactions/TransactionList';
import UpdateTransactionModal from '../components/Transactions/UpdateTransactionModal';

export default async function Transactions({ searchParams }: SearchParamProps) {
  const searchParam = await searchParams;

  return (
    <>
      <Navbar />

      <div className='mt-10 flex flex-col items-center justify-center gap-8'>
        <CreateTransaction />
        <TransactionList />
      </div>

      {searchParam?.show && <UpdateTransactionModal />}
    </>
  );
}
