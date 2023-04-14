import { useEditingManager } from '@/contexts/EditingManagerContext'
import { useModal } from '@/contexts/ModalContext'
import useWallet from '@/hooks/useWallet'
import { IWalletDoc } from '@/models/Wallet'
import { useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import Router from 'next/router'
import React from 'react'
import {
    IoAddCircle,
    IoArrowBackOutline,
    IoCardOutline,
    IoCreateOutline,
    IoEllipsisVerticalOutline,
    IoSwapHorizontalOutline,
    IoTrashOutline,
    IoWalletOutline,
} from 'react-icons/io5'

const Wallets = () => {
    const { wallets, isSuccess } = useWallet()
    const { addWalletModal, editWalletModal } = useModal()
    const { wallet: editingWallet } = useEditingManager()
    const [openContext, setOpenContext] = React.useState<string>()

    const handleOpenContext = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, wallet: IWalletDoc) => {
        e.stopPropagation()

        setOpenContext(openContext === wallet._id ? undefined : wallet._id)
    }

    const handleStartEditWallet = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, wallet: IWalletDoc) => {
        editingWallet.setCurrent(wallet)

        editWalletModal.open()
    }

    const handleDeleteWallet = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, wallet: IWalletDoc) => {
        e.stopPropagation()

        alert('Coming soon.')
    }

    React.useEffect(() => {
        const handleClick = () => {
            setOpenContext(undefined)
        }

        document.addEventListener('click', handleClick)

        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [])

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
                            className="relative flex flex-row items-center p-2 rounded-full hover:bg-gray-500 group-hover:text-white"
                            onClick={(e) => handleOpenContext(e, wallet)}
                        >
                            <IoEllipsisVerticalOutline className="w-6 h-6" />

                            <div
                                className={`absolute top-0 right-0 w-48 mt-2 bg-white text-black rounded-md shadow-lg z-10 ${
                                    openContext === wallet._id ? '' : 'hidden'
                                }`}
                            >
                                <ul className="flex flex-col">
                                    <li
                                        className="flex flex-row items-center justify-between p-2 cursor-pointer hover:bg-gray-400"
                                        onClick={(e) => handleStartEditWallet(e, wallet)}
                                    >
                                        <div className="flex flex-row items-center">
                                            <IoCreateOutline className="w-6 h-6" />
                                            <div className="ml-2">Edit</div>
                                        </div>
                                    </li>

                                    <li className="flex flex-row items-center justify-between p-2 cursor-pointer hover:bg-gray-400">
                                        <div className="flex flex-row items-center">
                                            <IoSwapHorizontalOutline className="w-6 h-6" />
                                            <div className="ml-2">Transfer</div>
                                        </div>
                                    </li>

                                    <li
                                        className="flex flex-row items-center justify-between p-2 cursor-pointer hover:bg-gray-400"
                                        onClick={(e) => handleDeleteWallet(e, wallet)}
                                    >
                                        <div className="flex flex-row items-center">
                                            <IoTrashOutline className="w-6 h-6" />
                                            <div className="ml-2">Delete</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
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
