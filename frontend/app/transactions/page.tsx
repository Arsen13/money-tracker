import Navbar from "../components/Nav/Navbar";
import CreateTransaction from "../components/Transactions/CreateTransacrion";
import TransactionList from "../components/Transactions/TransactionList";

export default function Transactions() {
	return (
		<>
			<Navbar />

			<div className="flex flex-col mt-10 justify-center items-center gap-8">
				<CreateTransaction />
        <TransactionList />
			</div>
		</>
	)
}