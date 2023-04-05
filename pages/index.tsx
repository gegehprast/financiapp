import Icon from '@/components/Icon'
import { useModal } from '@/contexts/ModalContext'
import useAuth from '@/hooks/useAuth'
import useTransaction from '@/hooks/useTransaction'
import useWallet from '@/hooks/useWallet'
import Link from 'next/link'
import React from 'react'
import { IoAddCircle, IoCardOutline, IoCashOutline } from 'react-icons/io5'

export default function Home() {
    const { wallets, isSuccess } = useWallet()
    const { addWalletModal } = useModal()
    const { transactions } = useTransaction()

    return (
        <main className="p-4">
            {/* total balance */}
            <section>
                <h1 className="text-3xl font-semibold">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
                        wallets.reduce((balance, wallet) => wallet.balance + balance, 0)
                    )}
                </h1>
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

                {isSuccess && wallets.length === 0 && (
                    <div className="w-full p-4 text-center text-gray-600">
                        <div>Belum ada wallet.</div>

                        <div className="p-4">
                            <button type="button" className="flex mx-auto font-medium text-white rounded-full group" onClick={addWalletModal.open}>
                                <IoAddCircle className="mx-auto text-green-500 w-14 h-14 group-hover:text-green-600" />
                            </button>
                        </div>
                    </div>
                )}

                <ul>
                    {wallets.slice(0, 2).map((wallet) => (
                        <li key={wallet._id} className="group hover:bg-gray-400 hover:text-white">
                            <Link href={'/wallet'} className="flex flex-col px-3 pb-3">
                                <div className="w-full border-t group-hover:border-gray-400"></div>

                                <div className="flex flex-row items-center justify-between mt-3">
                                    <div className="flex flex-row items-center">
                                        {wallet.type === 'cash' ? <IoCashOutline className="w-6 h-6" /> : <IoCardOutline className="w-6 h-6" />}
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
                    {transactions.slice(0, 3).map((transaction) => (
                        <li key={transaction._id} className="group hover:bg-gray-400">
                            <Link href={'/wallet'} className="flex flex-col px-3 pb-2">
                                <div className="w-full border-t group-hover:border-gray-400"></div>
                                <div className="flex flex-row items-center justify-between mt-2">
                                    <div className="flex flex-row items-center mt-2">
                                        <Icon icon={transaction.category.icon} className="w-6 h-6" />
                                        <div className="flex flex-col ml-3">
                                            <div className="font-medium">{transaction.category.name}</div>
                                            <div className="text-sm text-gray-500 group-hover:text-white">
                                                {transaction.date.toLocaleString('id-ID', {
                                                    dateStyle: 'full',
                                                    timeZone: 'Asia/Jakarta',
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`font-medium ${transaction.category.type === 'expense' ? 'text-red-500' : 'text-blue-500'}`}>
                                        {transaction.category.type === 'expense' ? '-' : ''}
                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(transaction.amount)}
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
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
