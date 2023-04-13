import { useModal } from '@/contexts/ModalContext'
import React from 'react'
import { IoAppsOutline, IoCalendarOutline, IoCashOutline, IoCloseOutline, IoDocumentTextOutline, IoWalletOutline } from 'react-icons/io5'
import SelectWalletModal from './SelectWalletModal'
import { IWalletDoc } from '@/models/Wallet'
import { ICategoryDoc } from '@/models/Category'
import SelectCategoryModal from './SelectCategoryModal'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getDateText } from '@/helpers/date'
import { useEditingManager } from '@/contexts/EditingManagerContext'
import { ITransactionDoc } from '@/models/Transaction'

interface EditTransactionModalProps {
    show: boolean
}

interface IPostUpdateTransaction {
    transactionId: string
    amount: number
    walletId: string
    categoryId: string
    notes: string
    date: Date
}

const updateTransaction = (data: IPostUpdateTransaction): Promise<ITransactionDoc> =>
    axios.put('/api/transaction/update', {
        transactionId: data.transactionId,
        amount: data.amount,
        walletId: data.walletId,
        categoryId: data.categoryId,
        notes: data.notes,
        date: data.date,
    })

const deleteTransaction = (transactionId: string): Promise<ITransactionDoc> => axios.delete(`/api/transaction/delete?transactionId=${transactionId}`)

const EditTransactionModal: React.FC<EditTransactionModalProps> = ({ show }) => {
    const queryClient = useQueryClient()
    const { editTransactionModal, selectWalletModal, selectCategoryModal } = useModal()
    const { transaction } = useEditingManager()
    const [amount, setAmount] = React.useState('')
    const [wallet, setWallet] = React.useState<IWalletDoc>()
    const [category, setCategory] = React.useState<ICategoryDoc>()
    const [notes, setNotes] = React.useState('')
    const [date, setDate] = React.useState(new Date(Date.now() - new Date().getTimezoneOffset() * 60000))
    const [isEditingAmount, setIsEditingAmount] = React.useState(false)
    const [isEditingDate, setIsEditingDate] = React.useState(false)
    const [error, setError] = React.useState<string>('')
    const [loading, setLoading] = React.useState<boolean>(false)
    const amountInputRef = React.useRef<HTMLInputElement>(null)
    const walletInputRef = React.useRef<HTMLInputElement>(null)
    const categoryInputRef = React.useRef<HTMLInputElement>(null)
    const dateInputRef = React.useRef<HTMLInputElement>(null)

    const transactionUpdatedMutation = useMutation({
        mutationFn: updateTransaction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] })
            queryClient.invalidateQueries({ queryKey: ['wallets'] })
            setLoading(false)
            editTransactionModal.close()
        },
        onError: (error) => {
            setError('Failed to update wallet.' + (error as Error).message)
            setLoading(false)
        },
    })

    const transactionDeletedMutation = useMutation({
        mutationFn: deleteTransaction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] })
            queryClient.invalidateQueries({ queryKey: ['wallets'] })
            setLoading(false)
            editTransactionModal.close()
        },
        onError: (error) => {
            setError('Failed to delete wallet.' + (error as Error).message)
            setLoading(false)
        },
    })

    const dateText = React.useMemo(() => getDateText(date), [date])

    const handleDeleteTransaction: React.MouseEventHandler<HTMLButtonElement> = async () => {
        if (loading || !transaction.current) {
            return
        }

        setError('')
        setLoading(true)
        
        transactionDeletedMutation.mutate(transaction.current._id)
    }

    const handleSaveTransaction: React.MouseEventHandler<HTMLButtonElement> = async () => {
        if (loading || !transaction.current) {
            return
        }

        setError('')
        setLoading(true)

        transactionUpdatedMutation.mutate({
            transactionId: transaction.current._id,
            amount: parseFloat(amount),
            walletId: wallet?._id,
            categoryId: category?._id,
            notes,
            date,
        })
    }

    React.useEffect(() => {
        if (show) {
            amountInputRef.current?.focus()
        }

        setIsEditingAmount(false)
        setIsEditingDate(false)
        setAmount(transaction.current?.amount.toString() || '')
        setWallet(transaction.current?.wallet || undefined)
        setCategory(transaction.current?.category || undefined)
        setNotes(transaction.current?.notes || '')
        setDate(transaction.current?.date || new Date(Date.now() - new Date().getTimezoneOffset() * 60000))
    }, [show, transaction])

    React.useEffect(() => {
        if (isEditingDate) {
            setTimeout(() => {
                dateInputRef.current?.showPicker()
            }, 100)
        }
    }, [isEditingDate])

    // detect click on document
    React.useEffect(() => {
        const handleClick = () => {
            setIsEditingDate(false)
        }

        document.addEventListener('click', handleClick)

        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [])

    return (
        <div
            className={`fixed w-screen left-0 top-0 h-[calc(100vh-4rem)] transition-transform duration-300 ease-in-out overflow-hidden ${
                show ? 'translate-y-0' : 'translate-y-[calc(100%+4rem)]'
            }`}
        >
            <div className="w-full h-full mx-auto bg-gray-200 lg:w-1/2 xl:w-1/4">
                <header className="flex flex-row items-center justify-between p-4 bg-white h-[3rem]">
                    <div className="flex flex-row items-center">
                        <button type="button" onClick={editTransactionModal.close}>
                            <IoCloseOutline className="w-6 h-6" />
                        </button>

                        <h1 className="ml-6 text-lg font-semibold">Edit Transaksi</h1>
                    </div>

                    <div className="flex flex-row items-center">
                        <button type="button" className="font-medium text-red-400" onClick={handleDeleteTransaction}>
                            Hapus
                        </button>
                        <div className="mx-2 text-gray-400">{' | '}</div>
                        <button type="button" className="font-medium text-green-400" onClick={handleSaveTransaction}>
                            Simpan
                        </button>
                    </div>
                </header>

                <section className="p-4 mt-5 bg-white">
                    <div className="flex flex-row items-center w-full">
                        <IoCashOutline className="w-8 h-8" />
                        {isEditingAmount ? (
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                onBlur={() => setIsEditingAmount(false)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === 'Tab') {
                                        if (wallet) {
                                            e.preventDefault()
                                        }

                                        setIsEditingAmount(false)
                                    }
                                }}
                                onKeyUp={(e) => {
                                    if (e.key === 'Enter' || e.key === 'Tab') {
                                        if (wallet) {
                                            e.preventDefault()
                                        }

                                        setIsEditingAmount(false)
                                    }
                                }}
                                className="w-full p-2 ml-2 text-3xl text-black border-b border-green-400 outline-none focus:border-b-2"
                            />
                        ) : (
                            <input
                                ref={amountInputRef}
                                type="text"
                                value={new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
                                    isNaN(amount as unknown as number) ? 0 : (amount as unknown as number)
                                )}
                                onFocus={() => setIsEditingAmount(true)}
                                onClick={() => setIsEditingAmount(true)}
                                className="w-full p-2 ml-2 text-3xl text-black border-b border-green-400 outline-none focus:border-b-2"
                                readOnly
                            />
                        )}
                    </div>

                    <div className="flex flex-row items-center w-full mt-4">
                        <IoWalletOutline className="w-8 h-8" />
                        <input
                            ref={walletInputRef}
                            type="text"
                            placeholder="Pilih wallet"
                            defaultValue={wallet?.name || ''}
                            className="w-full p-2 ml-2 text-black border-b border-green-400 outline-none focus:border-b-2"
                            onFocus={(e) => {
                                selectWalletModal.open()
                                e.currentTarget.blur()
                            }}
                            onClick={selectWalletModal.open}
                            readOnly={!!wallet}
                        />
                    </div>

                    <div className="flex flex-row items-center w-full mt-4">
                        <IoAppsOutline className="w-8 h-8" />
                        <input
                            ref={categoryInputRef}
                            type="text"
                            placeholder="Pilih kategori"
                            defaultValue={category?.name || ''}
                            className="w-full p-2 ml-2 text-black border-b border-green-400 outline-none focus:border-b-2"
                            onFocus={(e) => {
                                selectCategoryModal.open()
                                e.currentTarget.blur()
                            }}
                            onClick={selectCategoryModal.open}
                            readOnly={!!category}
                        />
                    </div>

                    <div className="flex flex-row items-center w-full mt-4">
                        <IoCalendarOutline className="w-8 h-8" />

                        {isEditingDate && (
                            <input
                                ref={dateInputRef}
                                type="date"
                                value={date.toISOString().split('T')[0]}
                                onChange={(e) => {
                                    if (e.target.value === '') {
                                        return
                                    }

                                    setDate(new Date(e.target.value))
                                    setIsEditingDate(false)
                                }}
                                onBlur={() => setIsEditingDate(false)}
                                onInput={() => setIsEditingDate(false)}
                                onSelect={() => setIsEditingDate(false)}
                                placeholder="Pilih kategori"
                                className={`w-full p-2 ml-2 text-black border-b border-green-400 outline-none focus:border-b-2 ${
                                    !isEditingDate && 'hidden'
                                }`}
                                required
                            />
                        )}

                        {!isEditingDate && (
                            <input
                                type="text"
                                value={dateText}
                                onClick={() => setIsEditingDate(true)}
                                onFocus={() => setIsEditingDate(true)}
                                placeholder="Pilih kategori"
                                className="w-full p-2 ml-2 text-black border-b border-green-400 outline-none focus:border-b-2"
                                readOnly
                            />
                        )}
                    </div>

                    <div className="flex flex-row items-center w-full mt-4">
                        <IoDocumentTextOutline className="w-8 h-8" />
                        <textarea
                            value={notes}
                            placeholder="Tulis catatan"
                            rows={3}
                            onChange={(e) => setNotes(e.target.value)}
                            className="w-full p-2 ml-2 text-black border-b border-green-400 outline-none focus:border-b-2"
                        />
                    </div>
                </section>
                {error && <div className="w-full mb-2 text-red-500">{error}</div>}
            </div>

            {show && (
                <>
                    <SelectWalletModal
                        show={selectWalletModal.show}
                        select={(wallet: IWalletDoc | null) => {
                            if (wallet) {
                                setWallet(wallet)
                                !category && categoryInputRef.current?.focus()
                            }
                        }}
                    />
                    <SelectCategoryModal
                        show={selectCategoryModal.show}
                        select={(category: ICategoryDoc) => {
                            setCategory(category)
                        }}
                    />
                </>
            )}
        </div>
    )
}

export default EditTransactionModal
