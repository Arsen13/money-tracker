import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";

export default function Transaction() {
	return (
		<div className="w-full bg-customBlue flex justify-around items-center rounded-sm h-12 hover:bg-purple-600 duration-500">
			<p className="w-[50px] text-center border-r-1">id</p>
			<p className="w-[200px] text-left truncate border-r-1">title</p>
			<p className="w-[150px] text-left truncate border-r-1">category</p>
			<p className="w-[100px] text-center border-r-1">amount</p>
			<p className="w-[120px] text-center border-r-1">date</p>
			<div className="flex gap-3">
				<RxUpdate className="w-5 h-5 hover:text-green-600 duration-300 cursor-pointer"/>
				<MdDelete className="w-5 h-5 hover:text-red-600 duration-300 cursor-pointer"/>
			</div>
		</div>
	)
}