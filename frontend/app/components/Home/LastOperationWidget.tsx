import Link from "next/link";

export default function LastOperationWidget() {
    return (
        <div className="flex flex-col gap-4 bg-widget w-2xl h-48 rounded-xl">
            <div className="flex justify-between my-5 mx-7">
                <p className="text-lg">Last transactions</p>
                <Link 
                    href='' 
                    className="bg-customBlue px-2 py-1 rounded-xl"
                >
                    Add transaction
                </Link>
            </div>
            <div className="flex justify-around">
                <div className="bg-linear-to-b from-cyan-500 to-blue-500 flex flex-col items-center gap-0.5 px-7 py-0.5 rounded-xl">
                    <p className="text-sm">Income</p>
                    <p className="text-2xl">+ 12600</p>
                    <p className="text-sm italic">salary</p>
                </div>
                <div className="bg-linear-to-b from-violet-500 to-fuchsia-500 flex flex-col items-center gap-0.5 px-7 py-0.5 rounded-xl">
                    <p className="text-sm">Expense</p>
                    <p className="text-2xl">- 730</p>
                    <p className="text-sm italic">fuel</p>
                </div>
            </div>
        </div>
    )
}