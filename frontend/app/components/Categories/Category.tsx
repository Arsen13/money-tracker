import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";

interface CategoryProps {
    id: string;
    title: string;
    createdAt: string;
}

export default function Category({ id, title, createdAt }: CategoryProps) {
    return (
        <div className="w-[calc(50%-10px)] h-15 rounded-sm bg-emerald-600 flex justify-between items-center">
            <div className="ml-3">
                <p className="text-lg italic font-mono">{title}</p>
                <p className="text-sm italic text-widget">{createdAt.split('T')[0].replaceAll("-", "/")}</p>
            </div>
            <div className="flex gap-3 mr-3">
                <RxUpdate className="w-5 h-5 hover:text-orange-500 duration-300 cursor-pointer"/>
                <MdDelete className="w-5 h-5 hover:text-red-600 duration-300 cursor-pointer"/>
            </div>
        </div>
    )
}