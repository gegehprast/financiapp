import Icon from '@/components/Icon'
import SelectWalletModal from '@/components/modals/SelectWalletModal'
import { useModal } from '@/contexts/ModalContext'
import getDateText from '@/helpers/getDateText'
import useTransaction from '@/hooks/useTransaction'
import useWallet from '@/hooks/useWallet'
import { IWalletDoc } from '@/models/Wallet'
import Link from 'next/link'
import React from 'react'
import { IoChevronDown } from 'react-icons/io5'

const Transactions = () => {
    const [wallet, setWallet] = React.useState<IWalletDoc | null>(null)
    const { wallets } = useWallet()
    const { transactions } = useTransaction({ query: { walletId: wallet ? wallet._id : '' } })
    const { selectWalletModal } = useModal()

    return (
        <main>
            {/* total balance */}
            <section className="p-4">
                <h1 className="text-3xl font-semibold">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
                        wallet ? wallet.balance : wallets.reduce((balance, wallet) => wallet.balance + balance, 0)
                    )}
                </h1>

                <button
                    onClick={selectWalletModal.open}
                    className="flex flex-row items-center px-2 py-1 mt-1 bg-gray-300 rounded hover:bg-gray-400 hover:text-white"
                >
                    <span>{wallet ? wallet.name : 'Semua wallet'}</span>
                    <IoChevronDown className="w-4 h-4 ml-2" />
                </button>
            </section>

            <section className="flex flex-col mt-5 bg-white">
                <ul>
                    {transactions.map((transaction) => (
                        <li key={transaction._id} className="group hover:bg-gray-400">
                            <Link href={'/wallet'} className="flex flex-col px-3 pb-2">
                                <div className="w-full border-t group-hover:border-gray-400"></div>
                                <div className="flex flex-row items-center justify-between mt-2">
                                    <div className="flex flex-row items-center mt-2">
                                        <Icon icon={transaction.category.icon} className="w-6 h-6" />
                                        <div className="flex flex-col ml-3">
                                            <div className="font-medium">{transaction.category.name}</div>
                                            <div className="text-sm text-gray-500 group-hover:text-white">{getDateText(transaction.date)}</div>
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

            <SelectWalletModal
                show={selectWalletModal.show}
                select={(wallet: IWalletDoc) => {
                    setWallet(wallet)
                }}
            />
        </main>
    )
}

export default Transactions
