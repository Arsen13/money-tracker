import CategoryList from "../components/Categories/CategoryList";
import CreateCategory from "../components/Categories/CreateCategory";
import Navbar from "../components/Nav/Navbar";

export default function Categories() {
	return (
		<>
			<Navbar />

			<div className="flex flex-col mt-10 justify-center items-center gap-8">
				<CreateCategory />
				<CategoryList />
			</div>
		</>
	)
}