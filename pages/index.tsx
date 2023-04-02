import BankNotes from "@/components/icons/BankNotes"
import CreditCard from "@/components/icons/CreditCard"
import useAuth from "@/hooks/useAuth"
import Link from "next/link"

export default function Home() {
    const { auth } = useAuth()

    return (
        <main>
            {/* total balance */}
            <section>
                <h1 className="text-3xl font-semibold">Rp187,844,999</h1>
                <small className="text-base">Total balance</small>
            </section>

            {/* wallets */}
            <section className="flex flex-col p-3 mt-5 bg-white rounded-lg">
                <div className="flex flex-row items-center justify-between">
                    <h2 className="text-lg font-semibold">My Wallets</h2>
                    <Link href={'/wallets'} className="font-medium text-green-400">
                        See all
                    </Link>
                </div>

                <ul>
                    <li className="flex flex-row items-center justify-between pt-2 mt-2 border-t">
                        <div className="flex flex-row items-center">
                            <div className="w-6 h-6">
                                <CreditCard />
                            </div>
                            <div className="ml-3 font-medium">Rekening BCA</div>
                        </div>

                        <div className="font-medium">Rp6,787,844</div>
                    </li>

                    <li className="flex flex-row items-center justify-between pt-2 mt-2 border-t">
                        <div className="flex flex-row items-center">
                            <div className="w-6 h-6">
                                <CreditCard />
                            </div>
                            <div className="ml-3 font-medium">Jenius</div>
                        </div>

                        <div className="font-medium">Rp543,844</div>
                    </li>

                    <li className="flex flex-row items-center justify-between pt-2 mt-2 border-t">
                        <div className="flex flex-row items-center">
                            <div className="w-6 h-6">
                                <BankNotes />
                            </div>
                            <div className="ml-3 font-medium">Tunai</div>
                        </div>

                        <div className="font-medium">Rp2,500,000</div>
                    </li>
                </ul>
            </section>

            {/* recent transactions */}
            <section className="flex flex-col p-3 mt-5 bg-white rounded-lg">
                <div className="flex flex-row items-center justify-between">
                    <h2 className="text-lg font-semibold">Recent Transactions</h2>
                    <Link href={'/transactions'} className="font-medium text-green-400">
                        See all
                    </Link>
                </div>

                <ul>
                    <li className="flex flex-row items-center justify-between pt-2 mt-2 border-t">
                        <div className="flex flex-col">
                            <div className="font-medium">Transportation</div>
                            <div className="text-sm text-gray-500">1 April 2023</div>
                        </div>
                        <div className="font-medium text-red-500">-Rp22,844</div>
                    </li>

                    <li className="flex flex-row items-center justify-between pt-2 mt-2 border-t">
                        <div className="flex flex-col">
                            <div className="font-medium">Food & Beverages</div>
                            <div className="text-sm text-gray-500">1 April 2023</div>
                        </div>
                        <div className="font-medium text-red-500">-Rp55,844</div>
                    </li>

                    <li className="flex flex-row items-center justify-between pt-2 mt-2 border-t">
                        <div className="flex flex-col">
                            <div className="font-medium">Salary</div>
                            <div className="text-sm text-gray-500">28 March 2023</div>
                        </div>
                        <div className="font-medium text-blue-500">Rp6,787,844</div>
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
