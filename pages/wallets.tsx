import EllipsisVertical from '@/components/icons/EllipsisVertical'
import AddWalletModal from '@/components/modals/AddWalletModal'
import useWallet from '@/hooks/useWallet'
import Link from 'next/link'
import Router from 'next/router'
import React from 'react'
import { IoAddCircle, IoAddOutline, IoArrowBackOutline, IoCardOutline, IoCashOutline } from 'react-icons/io5'

const Wallets = () => {
    const { wallets, isSuccess } = useWallet()
    const [showModal, setShowModal] = React.useState(false)

    return (
        <main className="relative">
            <header className="flex flex-row items-center p-4 bg-white">
                <button type="button" onClick={() => Router.back()}>
                    <IoArrowBackOutline className="w-6 h-6" />
                </button>

                <h1 className="ml-6 text-lg font-semibold">My Wallets</h1>
            </header>

            {isSuccess && wallets.length === 0 && <div className="w-full mt-5 text-center">Belum ada wallet.</div>}

            <ul className="mt-5 bg-white">
                {wallets.map((wallet) => (
                    <li className="group hover:bg-gray-400" key={wallet._id}>
                        <Link href={'/wallet'} className="flex flex-row items-center justify-between p-4">
                            <div className="flex flex-row items-center">
                                {wallet.type === 'cash' ? (
                                    <IoCashOutline className="w-8 h-8 group-hover:text-white" />
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

                            <div className="w-6 h-6">
                                <EllipsisVertical />
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="p-4">
                <button type="button" className="flex mx-auto font-medium text-white rounded-full group" onClick={() => setShowModal(true)}>
                    <IoAddCircle className="mx-auto text-green-500 w-14 h-14 group-hover:text-green-600" />
                </button>
            </div>

            <AddWalletModal setShow={setShowModal} show={showModal} />
        </main>
    )
}

export default Wallets
