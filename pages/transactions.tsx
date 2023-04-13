import Icon from '@/components/Icon'
import Tab from '@/components/Tab'
import SelectWalletModal from '@/components/modals/SelectWalletModal'
import { useEditingManager } from '@/contexts/EditingManagerContext'
import { useModal } from '@/contexts/ModalContext'
import { getDateText, isLastMonth, isLastWeek } from '@/helpers/date'
import useTransaction from '@/hooks/useTransaction'
import useWallet from '@/hooks/useWallet'
import { IPopulatedTransactionDoc } from '@/models/Transaction'
import { IWalletDoc } from '@/models/Wallet'
import {
    add,
    eachMonthOfInterval,
    eachWeekOfInterval,
    endOfDay,
    endOfMonth,
    endOfWeek,
    format,
    isThisMonth,
    isThisWeek,
    startOfYear,
} from 'date-fns'
import Link from 'next/link'
import React from 'react'
import { IoCalendar, IoChevronDown } from 'react-icons/io5'

const future = { start: add(new Date(), { days: 1 }), end: null, label: 'Masa depan' }
const ranges = {
    weeks: eachWeekOfInterval(
        {
            start: startOfYear(new Date()),
            end: endOfDay(new Date()),
        },
        { weekStartsOn: 1 }
    ).map((week) => ({
        start: week,
        end: endOfWeek(week, { weekStartsOn: 1 }),
        label: (() => {
            if (isThisWeek(week)) return 'Minggu ini'

            if (isLastWeek(week)) return 'Minggu lalu'

            return `${format(week, 'MM/dd')} - ${format(endOfWeek(week, { weekStartsOn: 1 }), 'MM/dd')}`
        })(),
    })),
    months: eachMonthOfInterval({
        start: startOfYear(new Date()),
        end: endOfDay(new Date()),
    }).map((month) => ({
        start: month,
        end: endOfMonth(month),
        label: (() => {
            if (isThisMonth(month)) return 'Bulan ini'

            if (isLastMonth(month)) return 'Bulan lalu'

            return format(month, 'MMMM')
        })(),
    })),
}

const rangeTypeTabItems = [
    { name: 'Mingguan', id: 'weeks' },
    { name: 'Bulanan', id: 'months' },
]

const Transactions = () => {
    const { selectWalletModal, editTransactionModal } = useModal()
    const { wallets } = useWallet()
    const { transaction: editingTransaction } = useEditingManager()
    const [wallet, setWallet] = React.useState<IWalletDoc | null>(null)
    const [rangeType, setRangeType] = React.useState<typeof rangeTypeTabItems[number]>(rangeTypeTabItems[0])
    const [currentRange, setCurrentRange] = React.useState<typeof future | typeof ranges[keyof typeof ranges][number]>(
        ranges[rangeType.id as keyof typeof ranges][ranges[rangeType.id as keyof typeof ranges].length - 1]
    )
    const { transactions, groupedTransactions } = useTransaction({
        query: {
            walletId: wallet ? wallet._id : '',
            startDate: format(currentRange.start, 'yyyy-MM-dd'),
            endDate: currentRange.end ? format(currentRange.end, 'yyyy-MM-dd') : '',
        },
    })
    const rangeRef = React.useRef<HTMLDivElement>(null)

    const handleStartEditTransaction = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, transaction: IPopulatedTransactionDoc) => {
        editingTransaction.setCurrent(transaction)

        editTransactionModal.open()
    }

    React.useEffect(() => {
        setCurrentRange(ranges[rangeType.id as keyof typeof ranges][ranges[rangeType.id as keyof typeof ranges].length - 1])

        if (rangeRef.current) {
            rangeRef.current.scrollLeft = rangeRef.current.scrollWidth
        }
    }, [rangeType])

    React.useEffect(() => {
        if (wallet) {
            const newWallet = wallets.find((x) => x._id === wallet._id)

            if (newWallet) {
                setWallet(newWallet)
            }
        }
    }, [wallet, wallets])

    return (
        <main>
            <section className="bg-white">
                <div className="p-4">
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
                </div>

                <div className="px-4 mt-4">
                    <Tab items={rangeTypeTabItems} active={rangeType} setActive={(type) => setRangeType(type)} />
                </div>

                <div ref={rangeRef} className="flex flex-row w-full mt-1 overflow-x-auto">
                    {ranges[rangeType.id as keyof typeof ranges].map((range, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`flex flex-row px-4 py-2 mx-1 text-sm text-center text-gray-500 whitespace-nowrap border-b ${
                                currentRange === range ? ' text-gray-900 border-gray-900' : 'border-white'
                            }`}
                            onClick={() => setCurrentRange(range)}
                        >
                            {range.label}
                        </button>
                    ))}

                    <button
                        type="button"
                        className={`flex flex-row px-4 py-2 mx-1 text-sm text-center text-gray-500 whitespace-nowrap border-b ${
                            currentRange === future ? ' text-gray-900 border-gray-900' : 'border-white'
                        }`}
                        onClick={() => setCurrentRange(future)}
                    >
                        {future.label}
                    </button>
                </div>
            </section>

            <section className="flex flex-row p-4 mt-5 bg-white">
                <div className="flex flex-row w-full">
                    <div className="flex flex-col flex-1 mr-2">
                        <div className="text-sm text-gray-500">Pemasukan</div>
                        <div className="font-medium text-blue-500">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
                                wallet
                                    ? transactions
                                          .filter((transaction) => transaction.category.type === 'income')
                                          .reduce((amount, transaction) => transaction.amount + amount, 0)
                                    : transactions
                                          .filter((transaction) => transaction.category.type === 'income')
                                          .reduce((amount, transaction) => transaction.amount + amount, 0)
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col flex-1 ml-2">
                        <div className="text-sm text-gray-500">Pengeluaran</div>
                        <div className="font-medium text-red-500">
                            {'-'}
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
                                wallet
                                    ? transactions
                                          .filter((transaction) => transaction.category.type === 'expense')
                                          .reduce((amount, transaction) => transaction.amount + amount, 0)
                                    : transactions
                                          .filter((transaction) => transaction.category.type === 'expense')
                                          .reduce((amount, transaction) => transaction.amount + amount, 0)
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {groupedTransactions.map((groupedTransaction) => (
                <section key={groupedTransaction.date.getTime()} className="flex flex-col mt-5 bg-white">
                    <div className="flex flex-row items-center justify-between p-2 px-4 bg-gray-50">
                        <div className="font-medium">{getDateText(groupedTransaction.date)}</div>

                        <div className={`text-sm ${groupedTransaction.total < 0 ? 'text-red-500' : 'text-blue-500'}`}>
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(groupedTransaction.total)}
                        </div>
                    </div>

                    <ul>
                        {groupedTransaction.transactions.map((transaction) => (
                            <li
                                key={transaction._id}
                                className="flex flex-col px-2 cursor-pointer group hover:bg-gray-400"
                                onClick={(e) => handleStartEditTransaction(e, transaction)}
                            >
                                <div className="flex flex-row items-center justify-between p-2 py-3 border-t group-hover:border-t-gray-400">
                                    <div className="flex flex-row items-center">
                                        <Icon icon={transaction.category.icon} className="w-7 h-7" />
                                        <div className="flex flex-col ml-3">
                                            <div>{transaction.category.name}</div>
                                            <div className="min-h-[0.75rem] text-sm text-gray-500 group-hover:text-white">{transaction.notes}</div>
                                        </div>
                                    </div>

                                    <div className={`text-sm ${transaction.category.type === 'expense' ? 'text-red-500' : 'text-blue-500'}`}>
                                        {transaction.category.type === 'expense' ? '-' : ''}
                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(transaction.amount)}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            ))}

            <SelectWalletModal
                show={selectWalletModal.show}
                select={(wallet: IWalletDoc | null) => {
                    setWallet(wallet)
                }}
                withTotal={true}
            />
        </main>
    )
}

export default Transactions
