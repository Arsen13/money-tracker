'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { IoClose } from "react-icons/io5";

export default function UpdateCategoryModal() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get('id');
  const title = searchParams.get('title');

  return (
    <div className="fixed inset-0 bg-black/60 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="p-8 w-96 shadow-lg rounded-md bg-widget relative">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white">Update category</h3>
          <div className="mt-2 px-7 py-3">
            <form>
                <input 
                    type="text"
                    name="title"
                    defaultValue={String(title)}
                    placeholder="Title"
                    className="w-64 h-10 border border-gray-400 rounded-md text-sm italic pl-2"
                />

                <button
                    type="submit"
                    className="bg-emerald-500 text-widget text-md px-6 py-2 mt-6 rounded-md cursor-pointer hover:bg-emerald-800 hover:text-white duration-500"
                >
                    Update
                </button>
            </form>
            <div className="absolute top-2 right-2">
                <IoClose onClick={router.back} className="w-6 h-6 cursor-pointer hover:text-red-500 duration-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}