import Navbar from "../components/Nav/Navbar";
import TransactionList from "../components/Transactions/TransactionList";

export default function Transactions() {
	return (
		<>
			<Navbar />
			<div className="flex justify-center mt-10">
        <TransactionList />
			</div>
		</>
	)
}