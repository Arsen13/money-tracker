import Link from "next/link";
import { CiLogout } from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";

export default function Navbar() {
    return(
        <div className="bg-widget h-16 flex justify-between items-center px-12 border-b border-b-gray-500 shadow-sm shadow-gray-500">
            <div>
                <h1 className="text-2xl">
                    Money <span className="text-sky-500">Tracker</span>
                </h1>
            </div>
            <div className="flex gap-14 text-xl">
                <Link href='' className="hover:text-sky-500 duration-300">Dashboard</Link>
                <Link href='' className="hover:text-sky-500 duration-300">Transactions</Link>
                <Link href='' className="hover:text-sky-500 duration-300">Categories</Link>
            </div>
            <div className="flex items-center gap-8 text-white">
                <FaRegCircleUser className="w-7 h-7 text-white" />
                <div className="flex flex-col gap-1">
                    <p className="text-sm">John Doe</p>
                    <p className="text-xs">johndoe@gmail.com</p>
                </div>
                <CiLogout className="w-8 h-8 hover:text-red-500 text-white duration-300 cursor-pointer" />
            </div>
        </div>
    )
}