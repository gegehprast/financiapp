import { useModal } from '@/contexts/ModalContext'
import useWallet from '@/hooks/useWallet'
import { IWalletDoc } from '@/models/Wallet'
import React from 'react'
import { IoArrowBackOutline, IoCardOutline, IoCashOutline, IoCloseOutline } from 'react-icons/io5'

interface SelectWalletModalProps {
    show: boolean
    select: (wallet: IWalletDoc) => void
}

const SelectWalletModal: React.FC<SelectWalletModalProps> = ({ show, select }) => {
    const { selectWalletModal } = useModal()
    const { wallets, isSuccess } = useWallet()

    return (
        <div
            className={`fixed w-full left-0 top-0 bg-gray-200 h-[calc(100vh-4rem)] transition-transform duration-300 ease-in-out ${
                show ? 'translate-y-0' : 'translate-y-[calc(100%+4rem)]'
            }`}
        >
            <header className="flex flex-row items-center p-4 bg-white">
                <button type="button" onClick={selectWalletModal.close}>
                    <IoArrowBackOutline className="w-6 h-6" />
                </button>

                <h1 className="ml-6 text-lg font-semibold">Pilih Wallet</h1>
            </header>

            <ul className="mt-5 bg-white">
                {wallets.map((wallet) => (
                    <li className="group hover:bg-gray-400" key={wallet._id}>
                        <button
                            onClick={() => {
                                select(wallet)
                                selectWalletModal.close()
                            }}
                            type="button"
                            className="flex flex-row items-center w-full p-4"
                        >
                            {wallet.type === 'cash' ? (
                                <IoCashOutline className="w-8 h-8 group-hover:text-white" />
                            ) : (
                                <IoCardOutline className="w-8 h-8 group-hover:text-white" />
                            )}

                            <div className="flex flex-col items-start justify-center ml-4">
                                <div className="font-medium group-hover:text-white">{wallet.name}</div>
                                <div className="text-gray-500 group-hover:text-white">
                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(wallet.balance)}
                                </div>
                            </div>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SelectWalletModal
