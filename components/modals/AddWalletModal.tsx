import { useModal } from '@/contexts/ModalContext'
import { IWalletDoc } from '@/models/Wallet'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect } from 'react'
import { IoCloseOutline } from 'react-icons/io5'

interface AddWalletModalProps {
    show: boolean
}

const postAddWallet = (data: { name: string; type: string; balance: number }): Promise<IWalletDoc> =>
    axios.post('/api/wallet/store', {
        name: data.name,
        type: data.type,
        balance: data.balance,
    })

const AddWalletModal: React.FC<AddWalletModalProps> = ({ show }) => {
    const queryClient = useQueryClient()
    const { addWalletModal } = useModal()
    const [name, setName] = React.useState('')
    const [type, setType] = React.useState('virtual')
    const [balance, setBalance] = React.useState(0)
    const [error, setError] = React.useState<string>('')
    const [loading, setLoading] = React.useState<boolean>(false)
    const nameInputRef = React.useRef<HTMLInputElement>(null)

    const mutation = useMutation({
        mutationFn: postAddWallet,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['wallets'] })
        },
    })

    const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault()

        if (loading) {
            return
        }

        setError('')
        setLoading(true)

        try {
            mutation.mutate({
                name,
                type,
                balance,
            })

            addWalletModal.close()
        } catch (error) {
            setError('Failed to add wallet.' + (error as Error).message)
        }

        setLoading(false)
    }

    useEffect(() => {
        if (show) {
            nameInputRef.current?.focus()
        }

        setName('')
        setType('virtual')
        setBalance(0)
    }, [show])
    
    return (
        <div
            className={`fixed w-full left-0 top-0 bg-gray-200 h-[calc(100vh-4rem)] transition-transform duration-300 ease-in-out ${
                show ? 'translate-y-0' : 'translate-y-full'
            }`}
        >
            <header className="flex flex-row items-center p-4 bg-white">
                <button type="button" onClick={addWalletModal.close}>
                    <IoCloseOutline className="w-6 h-6" />
                </button>

                <h1 className="ml-6 text-lg font-semibold">Tambah Wallet</h1>
            </header>

            <section className="p-4">
                <div className="w-full mt-2">
                    <label className="text-sm text-gray-600">Name</label>
                    <input
                        ref={nameInputRef}
                        type="text"
                        placeholder='e.g. "Rekening BCA"'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 text-black border border-green-400 rounded outline-green-500"
                    />
                </div>
                <div className="w-full mt-2">
                    <label className="text-sm text-gray-600">Saldo</label>
                    <input
                        type="number"
                        value={balance}
                        onChange={(e) => setBalance(parseFloat(e.target.value))}
                        className="w-full p-2 text-black border border-green-400 rounded outline-green-500"
                    />
                </div>
                <div className="w-full mt-2">
                    <label className="text-sm text-gray-600">Tipe wallet</label>

                    <div className="flex flex-row justify-around bg-gray-300 border border-green-400 rounded">
                        <label
                            className={`flex flex-row items-center p-1 w-1/2 text-center rounded text-gray-600 ${
                                type === 'virtual' ? 'bg-white ' : ''
                            }`}
                        >
                            <input type="radio" value="virtual" checked={type === 'virtual'} onChange={(e) => setType(e.target.value)} />
                            <div className="ml-2 ">Rekining / E-money</div>
                        </label>

                        <label
                            className={`flex flex-row items-center p-1 w-1/2 text-center rounded text-gray-600 ${type === 'cash' ? 'bg-white ' : ''}`}
                        >
                            <input type="radio" value="cash" checked={type === 'cash'} onChange={(e) => setType(e.target.value)} />
                            <div className="ml-2 ">Tunai</div>
                        </label>
                    </div>
                </div>
                <div className="w-full mt-2">
                    <label className="text-sm text-gray-600">Kurensi</label>
                    <input
                        type="text"
                        value={'Rupiah'}
                        className="w-full p-2 text-gray-600 bg-gray-300 border border-green-400 rounded outline-green-500"
                        readOnly
                    />
                </div>
                <div className="w-full mt-2">
                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-green-400 rounded hover:bg-green-500"
                        disabled={loading}
                    >
                        Simpan
                    </button>
                    {error && <div className="w-full mb-2 text-red-500">{error}</div>}
                </div>
            </section>
        </div>
    )
}

export default AddWalletModal
