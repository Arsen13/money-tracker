'use client';

import { CreateTransactionSchema } from "@/lib/types";
import toast from "react-hot-toast";

export default function CreateTransaction() {

	const createTransaction = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		const transaction = {
			title: formData.get('title'),
			amount: Number(formData.get('amount')),
			category: formData.get('category'),
			type: formData.get('type'),
		};

		const result = CreateTransactionSchema.safeParse(transaction);

		if (!result.success) {
			let errorMessage = '';
			result.error.issues.forEach(issue => errorMessage += `${issue.path[0]}: ${issue.message}. \n`);
			toast.error(errorMessage);
			return;
		}

		console.log(result.data);
	}
	
	return (
		<form
			onSubmit={createTransaction} 
			className="w-[945px] bg-widget border-none h-48 rounded-xl p-3 flex flex-col items-center justify-between"
		>
			<p className="text-center text-xl">New Transaction</p>
			
			<div className="w-full flex justify-around">
				<div className="flex flex-col gap-4">
					<input 
						type="text"
						name="title"
						placeholder="Title"
						className="h-8 border border-gray-400 rounded-md text-sm italic pl-2"
					/>

					<input 
						type="number"
						min={1}
						name="amount"
						placeholder="Amount"
						className="h-8 border border-gray-400 rounded-md text-sm italic pl-2"
					/>
				</div>

				<div className="flex flex-col gap-2 justify-center">
					<label htmlFor="category">
						<span>Category: </span>
						<select 
							name="category" 
							className="bg-customBlue h-8 text-sm rounded-md focus:ring-blue-500 px-2"
							required
						>
							<option value="1">Salary</option>
							<option value="2">Gift</option>
							<option value="3">Food</option>
						</select>
					</label>

					<div>
						<p>Type:</p>
						<label className="mr-2">
							<input 
								type="radio"
								name="type"
								value={'INCOME'}
								className=""
							/>
							<span className="ml-1">Income</span>
						</label>
						<label>
							<input 
								type="radio"
								name="type"
								value={'EXPENSE'}
								className=""
							/>
							<span className="ml-1">Expense</span>
						</label>
					</div>
				</div>
			</div>

			<button
				type="submit"
				className="bg-customBlue text-md px-2 py-1 rounded-md cursor-pointer hover:bg-orange-300 hover:text-widget duration-500 mt-3.5"
			>
				Create
			</button>
		</form>
	)
}