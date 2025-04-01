'use client';

import { logout } from "@/lib/authActions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CiLogout } from "react-icons/ci";

export default function LogoutBtn() {

    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logout(router)
        } catch (error) {
            toast.error(String(error))
        }
    }

    return (
        <CiLogout onClick={handleLogout} className="w-8 h-8 hover:text-red-500 text-white duration-300 cursor-pointer" />
    )
}