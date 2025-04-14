'use client';

import { CreateTransactionSchema } from "@/lib/types";
import { useCategoryStore } from "@/store/categoryStore";
import { useTransactionStore } from "@/store/transactionStore";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

export default function CreateTransaction() {

	const titleRef = useRef<HTMLInputElement>(null);
	const amountRef = useRef<HTMLInputElement>(null);

	const categories = useCategoryStore((state) => state.categories);
	const getCategories = useCategoryStore((state) => state.getCategories);
	const addTransaction = useTransactionStore((state) => state.addTransaction);

	const createTransaction = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		const result = CreateTransactionSchema.safeParse(Object.fromEntries(formData));

		if (!result.success) {
			let errorMessage = '';
			result.error.issues.forEach(issue => errorMessage += `${issue.path[0]}: ${issue.message}. \n`);
			toast.error(errorMessage);
			return;
		}

		addTransaction(result.data);

		if (titleRef.current && amountRef.current) {
			titleRef.current.value = '';
			amountRef.current.value = '';
		}

	}

	useEffect(() => {
		getCategories();
	}, [])
	
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
						ref={titleRef}
						placeholder="Title"
						className="h-8 border border-gray-400 rounded-md text-sm italic pl-2"
					/>

					<input 
						type="number"
						min={1}
						name="amount"
						ref={amountRef}
						placeholder="Amount"
						className="h-8 border border-gray-400 rounded-md text-sm italic pl-2"
					/>
				</div>

				<div className="flex flex-col gap-2 justify-center">
					<label htmlFor="category">
						<span>Category: </span>
						<select 
							id="category"
							name="category" 
							className="bg-customBlue h-8 text-sm rounded-md focus:ring-blue-500 px-2"
							required
						>
							{categories.map((category) => (
								<option 
									key={category.id} 
									value={category.id}
								>
									{category.title}
								</option>
							))}
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
				className="bg-customBlue text-md px-2 py-1 rounded-md cursor-pointer hover:bg-blue-600 duration-500 mt-3.5"
			>
				Create
			</button>
		</form>
	)
}