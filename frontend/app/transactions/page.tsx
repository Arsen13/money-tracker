import Navbar from '../components/Nav/Navbar';
import CreateTransaction from '../components/Transactions/CreateTransacrion';
import TransactionList from '../components/Transactions/TransactionList';
import UpdateTransactionModal from '../components/Transactions/UpdateTransactionModal';

export default function Transactions({ searchParams }: any) {
  const show = searchParams?.show;

  return (
    <>
      <Navbar />

      <div className='mt-10 flex flex-col items-center justify-center gap-8'>
        <CreateTransaction />
        <TransactionList />
      </div>

      {show && <UpdateTransactionModal />}
    </>
  );
}
