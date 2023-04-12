import { useModal } from '@/contexts/ModalContext'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { IoAddCircle, IoDocumentLock, IoHome, IoPerson, IoPieChart } from 'react-icons/io5'

const Menu = () => {
    const router = useRouter()
    const { addTransactionModal } = useModal()

    return (
        <div className="grid items-center justify-around w-full grid-flow-col grid-rows-1 text-gray-500">
            <Link href="/">
                <IoHome className={`w-6 h-6 hover:text-black ${(router.pathname === '' || router.pathname === '/') && 'text-black'}`} />
            </Link>

            <Link href="/transactions">
                <IoPieChart className={`w-6 h-6 hover:text-black ${router.pathname === '/transactions' && 'text-black'}`} />
            </Link>

            <button type="button" onClick={addTransactionModal.open}>
                <IoAddCircle className={`w-14 h-14 text-green-500 hover:text-green-600`} />
            </button>

            <Link href="/budgets">
                <IoDocumentLock className={`w-6 h-6 hover:text-black ${router.pathname === '/budgets' && 'text-black'}`} />
            </Link>

            <Link href="/account">
                <IoPerson
                    className={`w-6 h-6 hover:text-black ${
                        (router.pathname === '/account' || router.pathname === '/wallets' || router.pathname === '/categories') && 'text-black'
                    }`}
                />
            </Link>
        </div>
    )
}

export default Menu
