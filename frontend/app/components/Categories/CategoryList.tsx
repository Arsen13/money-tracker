import Category from "./Category";

export default function CategoryList() {
    return (
        <div className="w-[945px] bg-widget border-none h-96 rounded-xl p-3">
            <h3 className="text-xl text-center">Categories</h3>
            <div className="mt-6 mb-2 flex flex-wrap gap-3 justify-center">
                <Category />
                <Category />
                <Category />
                <Category />
                <Category />
                <Category />
                <Category />
                <Category />
            </div>
        </div>
    )
}