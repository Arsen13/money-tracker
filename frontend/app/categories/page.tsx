import CategoryList from '../components/Categories/CategoryList';
import CreateCategory from '../components/Categories/CreateCategory';
import UpdateCategoryModal from '../components/Categories/UpdateCategoryModal';
import Navbar from '../components/Nav/Navbar';

export default function Categories({ searchParams }: any) {
  const show = searchParams?.show;

  return (
    <>
      <Navbar />

      <div className='mt-10 flex flex-col items-center justify-center gap-8'>
        <CreateCategory />
        <CategoryList />
      </div>

      {show && <UpdateCategoryModal />}
    </>
  );
}
