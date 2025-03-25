import Transaction from "./Transaction";

export default function TransactionList() {
	return (
		<div className="w-[945px] bg-widget border-none h-96 rounded-xl p-3">
			<h3 className="text-xl">Transactions</h3>
			<div className="mt-3 mb-2 flex flex-col gap-3">
				<Transaction />
				<Transaction />
				<Transaction />
				<Transaction />
				<Transaction />
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