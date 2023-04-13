import { useEditingManager } from '@/contexts/EditingManagerContext'
import { useModal } from '@/contexts/ModalContext'
import useWallet from '@/hooks/useWallet'
import { IWalletDoc } from '@/models/Wallet'
import Router from 'next/router'
import React from 'react'
import { IoAddCircle, IoArrowBackOutline, IoCardOutline, IoEllipsisVerticalOutline, IoWalletOutline } from 'react-icons/io5'

const Wallets = () => {
    const { wallets, isSuccess } = useWallet()
    const { addWalletModal, editWalletModal } = useModal()
    const { wallet: editingWallet } = useEditingManager()

    const handleStartEditWallet = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, wallet: IWalletDoc) => {
        editingWallet.setCurrent(wallet)

        editWalletModal.open()
    }

    return (
        <main className="relative">
            <header className="flex flex-row items-center p-4 bg-white h-[3rem]">
                <button type="button" onClick={() => Router.back()}>
                    <IoArrowBackOutline className="w-6 h-6" />
                </button>

                <h1 className="ml-6 text-lg font-semibold">My Wallets</h1>
            </header>

            {isSuccess && wallets.length === 0 && <div className="w-full mt-5 text-center">Belum ada wallet.</div>}

            <ul className="mt-5 bg-white">
                {wallets.map((wallet) => (
                    <li
                        key={wallet._id}
                        className="flex flex-row items-center justify-between p-4 cursor-pointer group hover:bg-gray-400"
                        onClick={(e) => handleStartEditWallet(e, wallet)}
                    >
                        <div className="flex flex-row items-center">
                            {wallet.type === 'cash' ? (
                                <IoWalletOutline className="w-8 h-8 group-hover:text-white" />
                            ) : (
                                <IoCardOutline className="w-8 h-8 group-hover:text-white" />
                            )}

                            <div className="flex flex-col justify-center ml-4">
                                <div className="font-medium group-hover:text-white">{wallet.name}</div>
                                <div className="text-gray-500 group-hover:text-white">
                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(wallet.balance)}
                                </div>
                            </div>
                        </div>

                        <div
                            className="flex flex-row items-center p-2 rounded-full hover:bg-gray-500 group-hover:text-white"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <IoEllipsisVerticalOutline className="w-6 h-6" />
                        </div>
                    </li>
                ))}
            </ul>

            <div className="p-4">
                <button type="button" className="flex mx-auto font-medium text-white rounded-full group" onClick={addWalletModal.open}>
                    <IoAddCircle className="mx-auto text-green-500 w-14 h-14 group-hover:text-green-600" />
                </button>
            </div>
        </main>
    )
}

export default Wallets
