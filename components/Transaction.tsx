import React from 'react'
import { IoCardOutline, IoWalletOutline } from 'react-icons/io5'
import Icon from './Icon'
import { useModal } from '@/contexts/ModalContext'
import { useEditingManager } from '@/contexts/EditingManagerContext'
import { IPopulatedTransactionDoc } from '@/models/Transaction'

interface ITransactionProps {
    transaction: IPopulatedTransactionDoc
}

const Transaction: React.FC<ITransactionProps> = ({ transaction }) => {
    const { editTransactionModal } = useModal()
    const { transaction: editingTransaction } = useEditingManager()

    const handleStartEditTransaction = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, transaction: IPopulatedTransactionDoc) => {
        editingTransaction.setCurrent(transaction)

        editTransactionModal.open()
    }

    return (
        <li
            key={transaction._id}
            className="flex flex-col px-2 cursor-pointer group hover:bg-gray-400"
            onClick={(e) => handleStartEditTransaction(e, transaction)}
        >
            <div className="flex flex-row items-center justify-between p-2 py-3 border-t group-hover:border-t-gray-400 group-hover:text-white">
                <div className="flex flex-row items-center">
                    <Icon icon={transaction.category.icon} className="w-7 h-7" />
                    <div className="flex flex-col ml-3">
                        <div>{transaction.category.name}</div>
                        <div className="text-xs text-gray-500 group-hover:text-white">{transaction.notes}</div>
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className={`text-sm text-right ${transaction.category.type === 'expense' ? 'text-red-500' : 'text-blue-500'}`}>
                        {transaction.category.type === 'expense' ? '-' : ''}
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(transaction.amount)}
                    </div>
                    <div className="flex flex-row items-center justify-end text-gray-500 group-hover:text-white">
                        {transaction.wallet.type === 'cash' ? (
                            <IoWalletOutline className="w-4 h-4 mr-1" />
                        ) : (
                            <IoCardOutline className="w-4 h-4 mr-1" />
                        )}
                        <div className="text-xs text-right">{transaction.wallet.name}</div>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default Transaction
