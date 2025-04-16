import Link from 'next/link';
import { MdDelete } from 'react-icons/md';
import { RxUpdate } from 'react-icons/rx';

interface TransactionProps {
  id: string;
  title: string;
  category: string;
  amount: number;
  type: string;
  date: string;
  deleteTransaction: (id: string) => void;
}

export default function Transaction({
  id,
  title,
  category,
  amount,
  type,
  date,
  deleteTransaction,
}: TransactionProps) {
  const handleDelete = () => {
    if (confirm(`Are you sure you wanna delete '${title}' transaction?`)) {
      deleteTransaction(id);
    }
  };

  return (
    <div className='bg-customBlue flex h-12 w-full items-center justify-around rounded-sm duration-500 hover:bg-blue-600'>
      <p className='w-[50px] border-r-1 text-center'>{id}</p>
      <p className='w-[200px] truncate border-r-1 text-left'>{title}</p>
      <p className='w-[150px] truncate border-r-1 text-left'>{category}</p>
      <p className='w-[100px] truncate border-r-1 text-left'>
        {type.toLowerCase()}
      </p>
      <p className='w-[100px] border-r-1 text-left'>{amount}</p>
      <p className='w-[120px] border-r-1 text-left text-sm italic'>
        {date.split('T')[0].replaceAll('-', '/')}
      </p>
      <div className='flex gap-3'>
        <Link
          href={`/transactions?show=true&id=${id}&title=${title}&amount=${amount}`}
        >
          <RxUpdate className='h-5 w-5 cursor-pointer duration-300 hover:text-green-600' />
        </Link>
        <MdDelete
          onClick={handleDelete}
          className='h-5 w-5 cursor-pointer duration-300 hover:text-red-600'
        />
      </div>
    </div>
  );
}
