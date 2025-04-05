'use client';

import { useCategoryStore } from "@/store/categoryStore";
import Category from "./Category";
import { useEffect } from "react";

export default function CategoryList() {

    const categories = useCategoryStore((state) => state.categories);
    const getCategories = useCategoryStore((state) => state.getCategories);
    const deleteCategory = useCategoryStore((state) => state.deleteCategory);

    useEffect(() => {
        getCategories();
    }, [])

    return (
        <div className="w-[945px] bg-widget border-none h-96 rounded-xl p-3">
            <h3 className="text-xl text-center">Categories</h3>
            <div className="mt-6 mb-2 flex flex-wrap gap-3 justify-center">
                {categories.length <= 0 
                    ? (<div className="text-2xl mt-26">
                        You don't have categories
                    </div>)
                    : categories.map((category) => (
                        <Category 
                            key={category.id}
                            id={category.id}
                            title={category.title}
                            createdAt={category.createdAt} 
                            deleteCategory={deleteCategory}
                        />
                    )) 
                }
            </div>
        </div>
    )
}