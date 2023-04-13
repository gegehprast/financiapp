import ChevronRight from '@/components/icons/ChevronRight'
import axios from 'axios'
import Link from 'next/link'
import Router from 'next/router'
import React from 'react'
import { IoAppsOutline, IoLogOutOutline, IoSettingsOutline, IoWalletOutline } from 'react-icons/io5'

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
                            <IoWalletOutline className="w-6 h-6" />
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
                            <IoAppsOutline className="w-6 h-6" />
                            <div className="ml-3 font-medium">Kategori</div>
                        </div>

                        <div className="w-6 h-6">
                            <ChevronRight />
                        </div>
                    </Link>
                </li>

                <li className="group hover:bg-gray-500">
                    <Link href={'/setting'} className="flex flex-row items-center justify-between p-4">
                        <div className="flex flex-row items-center">
                            <IoSettingsOutline className="w-6 h-6" />
                            <div className="ml-3 font-medium">Pengaturan</div>
                        </div>

                        <div className="w-6 h-6">
                            <ChevronRight />
                        </div>
                    </Link>
                </li>

                <li className="cursor-pointer group hover:bg-gray-500" onClick={handleLogout}>
                    <button type="button" className="flex flex-row items-center justify-between p-4">
                        <div className="flex flex-row items-center">
                            <IoLogOutOutline className="w-6 h-6" />
                            <div className="ml-3 font-medium">Keluar</div>
                        </div>
                    </button>
                </li>
            </ul>
        </main>
    )
}

export default Account
