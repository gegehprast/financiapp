import { useEditingManager } from '@/contexts/EditingManagerContext'
import { useModal } from '@/contexts/ModalContext'
import { IWalletDoc } from '@/models/Wallet'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect } from 'react'
import { IoCloseOutline } from 'react-icons/io5'

type WalletType = 'virtual' | 'cash'

interface EditWalletModalProps {
    show: boolean
}

interface IPostUpdateWallet {
    walletId: string
    name: string
    type: WalletType
    balance: number
}

const updateWallet = (data: IPostUpdateWallet): Promise<IWalletDoc> =>
    axios.put('/api/wallet/update', {
        walletId: data.walletId,
        name: data.name,
        type: data.type,
        balance: data.balance,
    })

const deleteWallet = (walletId: string): Promise<IWalletDoc> => axios.delete(`/api/wallet/delete?walletId=${walletId}`)

const EditWalletModal: React.FC<EditWalletModalProps> = ({ show }) => {
    const queryClient = useQueryClient()
    const { editWalletModal } = useModal()
    const { wallet } = useEditingManager()
    const [name, setName] = React.useState('')
    const [type, setType] = React.useState<WalletType>('virtual')
    const [balance, setBalance] = React.useState(0)
    const [error, setError] = React.useState<string>('')
    const [loading, setLoading] = React.useState<boolean>(false)
    const nameInputRef = React.useRef<HTMLInputElement>(null)

    const walletUpdatedMutation = useMutation({
        mutationFn: updateWallet,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wallets'] })
            queryClient.invalidateQueries({ queryKey: ['transactions'] })
            setLoading(false)
            editWalletModal.close()
        },
        onError: (error) => {
            setError('Failed to update wallet.' + (error as Error).message)
            setLoading(false)
        },
    })

    const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault()

        if (loading || !wallet.current) {
            return
        }

        setError('')
        setLoading(true)

        walletUpdatedMutation.mutate({
            walletId: wallet.current._id,
            name,
            type,
            balance,
        })
    }

    useEffect(() => {
        if (show) {
            nameInputRef.current?.focus()
        }

        setName(wallet.current?.name || '')
        setType(wallet.current?.type || 'virtual')
        setBalance(wallet.current?.balance || 0)
    }, [show, wallet])

    return (
        <div
            className={`fixed w-screen left-0 top-0 h-[calc(100vh-4rem)] transition-transform duration-300 ease-in-out ${
                show ? 'translate-y-0' : 'translate-y-[calc(100%+4rem)]'
            }`}
        >
            <div className="w-full h-full mx-auto bg-gray-200 lg:w-1/2 xl:w-1/4">
                <header className="flex flex-row items-center p-4 bg-white h-[3rem]">
                    <button type="button" onClick={editWalletModal.close}>
                        <IoCloseOutline className="w-6 h-6" />
                    </button>

                    <h1 className="ml-6 text-lg font-semibold">Edit Wallet</h1>
                </header>

                <section className="p-4">
                    <div className="w-full mt-2">
                        <label className="text-sm text-gray-600">Nama</label>
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
                                <input
                                    type="radio"
                                    value="virtual"
                                    checked={type === 'virtual'}
                                    onChange={(e) => setType(e.target.value as WalletType)}
                                />
                                <div className="ml-2 ">Bank / E-money</div>
                            </label>

                            <label
                                className={`flex flex-row items-center p-1 w-1/2 text-center rounded text-gray-600 ${
                                    type === 'cash' ? 'bg-white ' : ''
                                }`}
                            >
                                <input type="radio" value="cash" checked={type === 'cash'} onChange={(e) => setType(e.target.value as WalletType)} />
                                <div className="ml-2 ">Tunai</div>
                            </label>
                        </div>
                    </div>
                    <div className="w-full mt-2">
                        <label className="text-sm text-gray-600">Mata uang</label>
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
        </div>
    )
}

export default EditWalletModal
