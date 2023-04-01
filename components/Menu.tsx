import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import CalendarDays from './icons/CalendarDays'
import ChartBar from './icons/ChartBar'
import CloudArrowUp from './icons/CloudArrowUp'
import CreditCard from './icons/CreditCard'
import Folder from './icons/Folder'
import Home from './icons/Home'
import Photo from './icons/Photo'
import Plus from './icons/Plus'
import PlusCircle from './icons/PlusCircle'
import Trash from './icons/Trash'
import User from './icons/User'

const routes = [
    {
        name: 'Home',
        path: '/',
        icon: <CalendarDays />,
    },
    {
        name: 'Transactions',
        path: '/photos',
        icon: <Photo />,
    },
    {
        name: 'Budgets',
        path: '/upload',
        icon: <CloudArrowUp />,
    },
    {
        name: 'Wallet',
        path: '/album',
        icon: <Folder />,
    },
]

const Menu = () => {
    const router = useRouter()

    return (
        <div className="grid items-center justify-around w-full grid-flow-col grid-rows-1 overflow-clip">
            <Link href="/">
                <button type="button" className={`w-6 h-6`}>
                    <Home />
                </button>
            </Link>

            <Link href="/transactions">
                <button type="button" className={`w-6 h-6`}>
                    <ChartBar />
                </button>
            </Link>

            <button type="button" className={`w-16 h-16 mb-4`}>
                <PlusCircle />
            </button>

            <Link href="/budgets">
                <button type="button" className={`w-6 h-6`}>
                    <CreditCard />
                </button>
            </Link>

            <Link href="/account">
                <button type="button" className={`w-6 h-6`}>
                    <User />
                </button>
            </Link>
        </div>
    )
}

export default Menu
