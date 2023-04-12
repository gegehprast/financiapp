import ArrowRightOnRectangle from '@/components/icons/ArrowRightOnRectangle'
import ChevronRight from '@/components/icons/ChevronRight'
import ReceiptPercent from '@/components/icons/ReceiptPercent'
import RectangleGroup from '@/components/icons/RectangleGroup'
import Wallet from '@/components/icons/Wallet'
import axios from 'axios'
import Link from 'next/link'
import Router from 'next/router'
import React from 'react'

const Account = () => {
    const handleLogout = () => {
        axios.post('/api/logout').then(() => {
            Router.push('/login')
        })
    }

    return (
        <main>
            <ul className="mt-5 bg-white">
                <li className="group hover:bg-gray-500">
                    <Link href={'/wallets'} className="flex flex-row items-center justify-between p-4">
                        <div className="flex flex-row items-center">
                            <div className="w-6 h-6">
                                <Wallet />
                            </div>
                            <div className="ml-3 font-medium">My Wallets</div>
                        </div>

                        <div className="w-6 h-6">
                            <ChevronRight />
                        </div>
                    </Link>
                </li>

                <li className="group hover:bg-gray-500">
                    <Link href={'/categories'} className="flex flex-row items-center justify-between p-4">
                        <div className="flex flex-row items-center">
                            <div className="w-6 h-6">
                                <RectangleGroup />
                            </div>
                            <div className="ml-3 font-medium">Categories</div>
                        </div>

                        <div className="w-6 h-6">
                            <ChevronRight />
                        </div>
                    </Link>
                </li>

                <li className="cursor-pointer group hover:bg-gray-500" onClick={handleLogout}>
                    <button type="button" className="flex flex-row items-center justify-between p-4">
                        <div className="flex flex-row items-center">
                            <div className="w-6 h-6">
                                <ArrowRightOnRectangle />
                            </div>
                            <div className="ml-3 font-medium">Logout</div>
                        </div>
                    </button>
                </li>
            </ul>
        </main>
    )
}

export default Account
