import { useModal } from '@/contexts/ModalContext'
import React from 'react'
import {
    IoApps,
    IoAppsOutline,
    IoCalendarOutline,
    IoCashOutline,
    IoCloseOutline,
    IoDocumentTextOutline,
    IoTextOutline,
    IoWalletOutline,
} from 'react-icons/io5'
import SelectWalletModal from './SelectWalletModal'
import { IWalletDoc } from '@/models/Wallet'
import { ICategoryDoc } from '@/models/Category'
import SelectCategoryModal from './SelectCategoryModal'

interface AddTransactionModalProps {
    show: boolean
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ show }) => {
    const { addTransactionModal, selectWalletModal, selectCategoryModal } = useModal()
    const amountInputRef = React.useRef<HTMLInputElement>(null)
    const walletInputRef = React.useRef<HTMLInputElement>(null)
    const categoryInputRef = React.useRef<HTMLInputElement>(null)
    const dateInputRef = React.useRef<HTMLInputElement>(null)
    const [amount, setAmount] = React.useState('')
    const [isEditingAmount, setIsEditingAmount] = React.useState(false)
    const [wallet, setWallet] = React.useState<IWalletDoc>()
    const [category, setCategory] = React.useState<ICategoryDoc>()
    const [note, setNote] = React.useState('')
    const [date, setDate] = React.useState(new Date(Date.now() - new Date().getTimezoneOffset() * 60000))

    React.useEffect(() => {
        if (show) {
            amountInputRef.current?.focus()
        }

        setAmount('')
        setWallet(undefined)
        setCategory(undefined)
        setDate(new Date(Date.now() - new Date().getTimezoneOffset() * 60000))
        setNote('')
    }, [show])

    return (
        <div
            className={`fixed w-full left-0 top-0 bg-gray-200 h-[calc(100vh-4rem)] transition-transform duration-300 ease-in-out ${
                show ? 'translate-y-0' : 'translate-y-full'
            }`}
        >
            <header className="flex flex-row items-center justify-between p-4 bg-white">
                <div className="flex flex-row items-center">
                    <button type="button" onClick={addTransactionModal.close}>
                        <IoCloseOutline className="w-6 h-6" />
                    </button>

                    <h1 className="ml-6 text-lg font-semibold">Buat Transaksi</h1>
                </div>

                <button type="button" className="font-medium text-green-400">
                    Simpan
                </button>
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
                        value={wallet?.name || ''}
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
                        value={category?.name || ''}
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
                    <input
                        ref={dateInputRef}
                        type="date"
                        value={date.toISOString().split('T')[0]}
                        onChange={(e) => setDate(new Date(e.target.value))}
                        placeholder="Pilih kategori"
                        className="w-full p-2 ml-2 text-black border-b border-green-400 outline-none focus:border-b-2"
                    />
                </div>

                <div className="flex flex-row items-center w-full mt-4">
                    <IoDocumentTextOutline className="w-8 h-8" />
                    <textarea
                        value={note}
                        placeholder="Tulis catatan"
                        rows={3}
                        onChange={(e) => setNote(e.target.value)}
                        className="w-full p-2 ml-2 text-black border-b border-green-400 outline-none focus:border-b-2"
                    />
                </div>
            </section>

            <SelectWalletModal
                show={selectWalletModal.show}
                select={(wallet: IWalletDoc) => {
                    setWallet(wallet)
                    !category && categoryInputRef.current?.focus()
                }}
            />
            <SelectCategoryModal
                show={selectCategoryModal.show}
                select={(category: ICategoryDoc) => {
                    setCategory(category)
                    dateInputRef.current?.showPicker()
                }}
            />
        </div>
    )
}

export default AddTransactionModal
