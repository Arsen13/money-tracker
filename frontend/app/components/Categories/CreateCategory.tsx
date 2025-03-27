'use client';

import { CreateCategorySchema } from "@/lib/types";
import toast from "react-hot-toast";

export default function CreateCategory() {

    const createCategory = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const transaction = {
            title: formData.get('title'),
            amount: Number(formData.get('amount')),
            category: formData.get('category'),
            type: formData.get('type'),
        };

        const result = CreateCategorySchema.safeParse(transaction);

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
            onSubmit={createCategory} 
            className="w-[945px] bg-widget border-none h-48 rounded-xl p-3 flex flex-col items-center justify-between"
        >
            <p className="text-center text-xl">New Category</p>
            
            <input 
                type="text"
                name="title"
                placeholder="Title"
                className="w-64 h-10 border border-gray-400 rounded-md text-sm italic pl-2"
            />

            <button
                type="submit"
                className="bg-customBlue text-md px-2 py-1 rounded-md cursor-pointer hover:bg-orange-300 hover:text-widget duration-500 mt-3.5"
            >
                Create
            </button>
        </form>
    )
}