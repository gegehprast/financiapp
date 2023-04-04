import BankNotes from "@/components/icons/BankNotes"
import CreditCard from "@/components/icons/CreditCard"
import useAuth from "@/hooks/useAuth"
import useWallet from "@/hooks/useWallet"
import Link from "next/link"
import { IoCardOutline, IoCashOutline } from "react-icons/io5"

export default function Home() {
    const { auth } = useAuth()
    const { wallets, isSuccess } = useWallet(2)

    return (
        <main className="p-4">
            {/* total balance */}
            <section>
                <h1 className="text-3xl font-semibold">Rp187,844,999</h1>
                <small className="text-base">Total balance</small>
            </section>

            {/* wallets */}
            <section className="flex flex-col mt-5 bg-white rounded-lg">
                <div className="flex flex-row items-center justify-between p-3">
                    <h2 className="text-lg font-semibold">My Wallets</h2>
                    <Link href={'/wallets'} className="font-medium text-green-400">
                        See all
                    </Link>
                </div>

                <ul>
                    {wallets.map((wallet) => (
                        <li key={wallet._id} className="group hover:bg-gray-400 hover:text-white">
                            <Link href={'/wallet'} className="flex flex-col px-3 pb-3">
                                <div className="w-full border-t group-hover:border-gray-400"></div>

                                <div className="flex flex-row items-center justify-between mt-3">
                                    <div className="flex flex-row items-center">
                                        {wallet.type === 'cash' ? (
                                            <IoCashOutline className="w-6 h-6" />
                                        ) : (
                                            <IoCardOutline className="w-6 h-6" />
                                        )}
                                        <div className="ml-3 font-medium">{wallet.name}</div>
                                    </div>

                                    <div className="font-medium">
                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(wallet.balance)}
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            {/* recent transactions */}
            <section className="flex flex-col mt-5 bg-white rounded-lg">
                <div className="flex flex-row items-center justify-between p-3">
                    <h2 className="text-lg font-semibold">Recent Transactions</h2>
                    <Link href={'/transactions'} className="font-medium text-green-400">
                        See all
                    </Link>
                </div>

                <ul>
                    <li className="group hover:bg-gray-400">
                        <Link href={'/wallet'} className="flex flex-col px-3 pb-2">
                            <div className="w-full border-t group-hover:border-gray-400"></div>
                            <div className="flex flex-row items-center justify-between mt-2">
                                <div className="flex flex-col">
                                    <div className="font-medium">Transportation</div>
                                    <div className="text-sm text-gray-500 group-hover:text-white">1 April 2023</div>
                                </div>
                                <div className="font-medium text-red-500">-Rp22,844</div>
                            </div>
                        </Link>
                    </li>

                    <li className="group hover:bg-gray-400">
                        <Link href={'/wallet'} className="flex flex-col px-3 pb-2">
                            <div className="w-full border-t group-hover:border-gray-400"></div>
                            <div className="flex flex-row items-center justify-between mt-2">
                                <div className="flex flex-col">
                                    <div className="font-medium">Food & Beverages</div>
                                    <div className="text-sm text-gray-500 group-hover:text-white">1 April 2023</div>
                                </div>
                                <div className="font-medium text-red-500">-Rp55,844</div>
                            </div>
                        </Link>
                    </li>

                    <li className="group hover:bg-gray-400">
                        <Link href={'/wallet'} className="flex flex-col px-3 pb-2">
                            <div className="w-full border-t group-hover:border-gray-400"></div>
                            <div className="flex flex-row items-center justify-between mt-2">
                                <div className="flex flex-col">
                                    <div className="font-medium">Salary</div>
                                    <div className="text-sm text-gray-500 group-hover:text-white">28 March 2023</div>
                                </div>
                                <div className="font-medium text-blue-500">Rp6,787,844</div>
                            </div>
                        </Link>
                    </li>
                </ul>
            </section>

            {/* spending report */}
            <section className="flex flex-col p-3 mt-5 bg-white rounded-lg">
                <div className="flex flex-row items-center justify-between">
                    <h2 className="text-lg font-semibold">Spending Reports</h2>
                    <Link href={'/reports'} className="font-medium text-green-400">
                        See reports
                    </Link>
                </div>

                <div className="h-[250px]"></div>

                {/* top spending */}
                <div className="flex flex-row items-center justify-between">
                    <h2 className="font-semibold">Top Spending</h2>
                </div>

                <div className="h-[100px]"></div>
            </section>
        </main>
    )
}
