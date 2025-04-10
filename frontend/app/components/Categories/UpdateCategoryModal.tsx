'use client';

import { CreateCategorySchema } from "@/lib/types";
import { useCategoryStore } from "@/store/categoryStore";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";

export default function UpdateCategoryModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const updateCategory = useCategoryStore((state) => state.updateCategory);

  const id = searchParams.get('id');
  const title = searchParams.get('title');


  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);

      const result = CreateCategorySchema.safeParse(Object.fromEntries(formData));

      if (!result.success) {
          let errorMessage = '';
          result.error.issues.forEach(issue => errorMessage += `${issue.path[0]}: ${issue.message}. \n`);
          toast.error(errorMessage);
          return;
      }
      if (!id) {
        toast.error("Missing category ID");
        return;
      } 
      
      updateCategory(id, result.data.title);
      router.back();
      toast.success("Category was successfully updated");
  }

  return (
    <div className="fixed inset-0 bg-black/60 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="p-8 w-96 shadow-lg rounded-md bg-widget relative">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white">Update category</h3>
          <div className="mt-2 px-7 py-3">
            <form onSubmit={handleUpdate}>
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