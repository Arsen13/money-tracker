import CategoryList from "../components/Categories/CategoryList";
import CreateCategory from "../components/Categories/CreateCategory";
import UpdateCategoryModal from "../components/Categories/UpdateCategoryModal";
import Navbar from "../components/Nav/Navbar";

type SearchParamProps = {
	searchParams: Record<string, string> | null | undefined;
};

export default function Categories({ searchParams }: SearchParamProps) {
	const show = searchParams?.show;

	return (
		<>
			<Navbar />

			<div className="flex flex-col mt-10 justify-center items-center gap-8">
				<CreateCategory />
				<CategoryList />
			</div>

			{show && <UpdateCategoryModal/> }
		</>
	)
}