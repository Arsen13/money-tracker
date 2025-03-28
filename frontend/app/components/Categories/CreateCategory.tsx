'use client';

import { CreateCategorySchema } from "@/lib/types";
import toast from "react-hot-toast";

export default function CreateCategory() {

    const createCategory = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const category = {
            title: formData.get('title'),
        };

        const result = CreateCategorySchema.safeParse(category);

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
                className="bg-emerald-500 text-widget text-md px-6 py-2 rounded-md cursor-pointer hover:bg-emerald-800 hover:text-white duration-500"
            >
                Create
            </button>
        </form>
    )
}