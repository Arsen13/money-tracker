import Link from "next/link";
import LastTransactionData from "./LastTransactionData";

export default function LastOperationWidget() {
    return (
        <div className="flex flex-col gap-4 bg-widget w-2xl h-48 rounded-xl">
            <div className="flex justify-between my-5 mx-7">
                <p className="text-lg">Last transactions</p>
                <Link 
                    href='/transactions' 
                    className="bg-customBlue px-2 py-1 rounded-xl hover:bg-indigo-600 duration-500"
                >
                    Add transaction
                </Link>
            </div>

            <LastTransactionData />
        </div>
    )
}