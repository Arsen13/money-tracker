import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";

interface TransactionProps {
	id: string;
	title: string;
	category: string;
	amount: number;
	type: string;
	date: string;
	deleteTransaction: (id: string) => void;
}

export default function Transaction({ id, title, category, amount, type, date, deleteTransaction }: TransactionProps) {

	const handleDelete = () => {
		if (confirm(`Are you sure you wanna delete '${title}' transaction?`)) {
			deleteTransaction(id);
		}
	}

	return (
		<div className="w-full bg-customBlue flex justify-around items-center rounded-sm h-12 hover:bg-blue-600 duration-500">
			<p className="w-[50px] text-center border-r-1">{id}</p>
			<p className="w-[200px] text-left truncate border-r-1">{title}</p>
			<p className="w-[150px] text-left truncate border-r-1">{category}</p>
			<p className="w-[100px] text-left truncate border-r-1">{type.toLowerCase()}</p>
			<p className="w-[100px] text-left border-r-1">{amount}</p>
			<p className="w-[120px] text-left border-r-1 text-sm italic">{date.split('T')[0].replaceAll('-', '/')}</p>
			<div className="flex gap-3">
				<RxUpdate className="w-5 h-5 hover:text-green-600 duration-300 cursor-pointer"/>
				<MdDelete onClick={handleDelete} className="w-5 h-5 hover:text-red-600 duration-300 cursor-pointer"/>
			</div>
		</div>
	)
}