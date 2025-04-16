import { SearchParamProps } from '@/lib/types';
import CategoryList from '../components/Categories/CategoryList';
import CreateCategory from '../components/Categories/CreateCategory';
import UpdateCategoryModal from '../components/Categories/UpdateCategoryModal';
import Navbar from '../components/Nav/Navbar';

export default async function Categories({ searchParams }: SearchParamProps) {
  const searchParam = await searchParams;

  return (
    <>
      <Navbar />

      <div className='mt-10 flex flex-col items-center justify-center gap-8'>
        <CreateCategory />
        <CategoryList />
      </div>

      {searchParam?.show && <UpdateCategoryModal />}
    </>
  );
}
