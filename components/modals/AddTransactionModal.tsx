import { useModal } from '@/contexts/ModalContext'
import React from 'react'
import { IoApps, IoAppsOutline, IoCalendarOutline, IoCashOutline, IoCloseOutline, IoDocumentTextOutline, IoTextOutline, IoWalletOutline } from 'react-icons/io5'

interface AddTransactionModalProps {
    show: boolean
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ show }) => {
    const { addTransactionModal } = useModal()
    const amountInputRef = React.useRef<HTMLInputElement>(null)
    const [amount, setAmount] = React.useState(0)
    const [isEditingAmount, setIsEditingAmount] = React.useState(false)
    const [note, setNote] = React.useState('')
    const [date, setDate] = React.useState(new Date(Date.now() - new Date().getTimezoneOffset() * 60000))

    React.useEffect(() => {
        if (show) {
            amountInputRef.current?.focus()
        }

        setAmount(0)
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

                    <h1 className="ml-6 text-lg font-semibold">Add Transaction</h1>
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
                            value={amount.toFixed()}
                            onChange={(e) => setAmount(parseFloat(e.target.value))}
                            onBlur={() => setIsEditingAmount(false)}
                            className="w-full p-2 ml-2 text-3xl text-black border-b border-green-400 outline-none focus:border-b-2"
                        />
                    ) : (
                        <input
                            type="text"
                            value={new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount)}
                            onFocus={() => setIsEditingAmount(true)}
                            className="w-full p-2 ml-2 text-3xl text-black border-b border-green-400 outline-none focus:border-b-2"
                            readOnly
                        />
                    )}
                </div>

                <div className="flex flex-row items-center w-full mt-4">
                    <IoWalletOutline className="w-8 h-8" />
                    <input
                        type="text"
                        placeholder="Pilih wallet"
                        className="w-full p-2 ml-2 text-black border-b border-green-400 outline-none focus:border-b-2"
                    />
                </div>

                <div className="flex flex-row items-center w-full mt-4">
                    <IoAppsOutline className="w-8 h-8" />
                    <input
                        type="text"
                        placeholder="Pilih kategori"
                        className="w-full p-2 ml-2 text-black border-b border-green-400 outline-none focus:border-b-2"
                    />
                </div>

                <div className="flex flex-row items-center w-full mt-4">
                    <IoCalendarOutline className="w-8 h-8" />
                    <input
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
        </div>
    )
}

export default AddTransactionModal
