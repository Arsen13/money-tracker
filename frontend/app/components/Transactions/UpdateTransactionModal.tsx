'use client';
import { useCategoryStore } from "@/store/categoryStore";
import { IoClose } from "react-icons/io5";

export default function UpdateTransactionModal() {

  const categories = useCategoryStore((state) => state.categories);

  return (
    <div className="fixed inset-0 bg-black/60 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="p-8 w-96 shadow-lg rounded-md bg-widget relative">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white">Update transaction</h3>
          <div className="mt-2 px-7 py-3">
            <form className="flex flex-col gap-2.5">
                <input 
                    type="text"
                    name="title"
                    placeholder="Title"
                    className="w-64 h-10 border border-gray-400 rounded-md text-sm italic pl-2"
                />

                <input 
                  type="number"
                  min={1}
                  name="amount"
                  placeholder="Amount"
                  className="w-64 h-10 border border-gray-400 rounded-md text-sm italic pl-2"
                />

                <label htmlFor="category">
                  <p className="text-center">Category: </p>
                  <select 
                    id="category"
                    name="category" 
                    className="bg-customBlue h-8 w-full text-sm rounded-md focus:ring-blue-500 px-2"
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
                  <p className="text-center">Type:</p>
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

                <button
                    type="submit"
                    className="bg-customBlue text-md px-6 py-2 mt-6 rounded-md cursor-pointer hover:bg-blue-600 duration-500"
                >
                    Update
                </button>
            </form>
            <div className="absolute top-2 right-2">
                <IoClose className="w-6 h-6 cursor-pointer hover:text-red-500 duration-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}