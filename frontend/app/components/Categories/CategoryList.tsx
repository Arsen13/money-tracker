'use client';

import { useCategoryStore } from '@/store/categoryStore';
import Category from './Category';
import { useEffect } from 'react';
import CategorySkeleton from '../skeletons/CategorySkeleton';

export default function CategoryList() {
  const categories = useCategoryStore((state) => state.categories);
  const getCategories = useCategoryStore((state) => state.getCategories);
  const deleteCategory = useCategoryStore((state) => state.deleteCategory);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className='bg-widget h-96 w-[945px] rounded-xl border-none p-3'>
      <h3 className='text-center text-xl'>Categories</h3>
      <div className='mt-6 mb-2 flex flex-wrap justify-center gap-3'>
        {categories.length <= 0 ? (
          <CategorySkeleton />
        ) : (
          categories.map((category) => (
            <Category
              key={category.id}
              id={category.id}
              title={category.title}
              createdAt={category.createdAt}
              deleteCategory={deleteCategory}
            />
          ))
        )}
      </div>
    </div>
  );
}
