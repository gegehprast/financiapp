import ArrowPathRounded from '@/components/icons/ArrowPathRounded'
import ArrowRightOnRectangle from '@/components/icons/ArrowRightOnRectangle'
import ChevronRight from '@/components/icons/ChevronRight'
import ReceiptPercent from '@/components/icons/ReceiptPercent'
import RectangleGroup from '@/components/icons/RectangleGroup'
import Tag from '@/components/icons/Tag'
import Wallet from '@/components/icons/Wallet'
import Link from 'next/link'
import React from 'react'

const Account = () => {
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

                <li className="group hover:bg-gray-500">
                    <Link href={'/bills'} className="flex flex-row items-center justify-between p-4">
                        <div className="flex flex-row items-center">
                            <div className="w-6 h-6">
                                <ReceiptPercent />
                            </div>
                            <div className="ml-3 font-medium">Bills</div>
                        </div>

                        <div className="w-6 h-6">
                            <ChevronRight />
                        </div>
                    </Link>
                </li>

                <li className="group hover:bg-gray-500">
                    <Link href={'/logout'} className="flex flex-row items-center justify-between p-4">
                        <div className="flex flex-row items-center">
                            <div className="w-6 h-6">
                                <ArrowRightOnRectangle />
                            </div>
                            <div className="ml-3 font-medium">Logout</div>
                        </div>
                    </Link>
                </li>
            </ul>
        </main>
    )
}

export default Account
