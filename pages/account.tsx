import ArrowPathRounded from '@/components/icons/ArrowPathRounded'
import ArrowRightOnRectangle from '@/components/icons/ArrowRightOnRectangle'
import ChevronRight from '@/components/icons/ChevronRight'
import ReceiptPercent from '@/components/icons/ReceiptPercent'
import RectangleGroup from '@/components/icons/RectangleGroup'
import Tag from '@/components/icons/Tag'
import Wallet from '@/components/icons/Wallet'
import React from 'react'

const Account = () => {
    return (
        <main>
            <ul>
                <li className="flex flex-row items-center justify-between p-2 pt-2 mt-2 border-t hover:bg-gray-500">
                    <div className="flex flex-row items-center">
                        <div className="w-6 h-6">
                            <Wallet />
                        </div>
                        <div className="ml-3 font-medium">My Wallets</div>
                    </div>

                    <div className="w-6 h-6">
                        <ChevronRight />
                    </div>
                </li>

                <li className="flex flex-row items-center justify-between p-2 pt-2 mt-2 border-t hover:bg-gray-500">
                    <div className="flex flex-row items-center">
                        <div className="w-6 h-6">
                            <RectangleGroup />
                        </div>
                        <div className="ml-3 font-medium">Categories</div>
                    </div>

                    <div className="w-6 h-6">
                        <ChevronRight />
                    </div>
                </li>

                <li className="flex flex-row items-center justify-between p-2 pt-2 mt-2 border-t hover:bg-gray-500">
                    <div className="flex flex-row items-center">
                        <div className="w-6 h-6">
                            <ReceiptPercent />
                        </div>
                        <div className="ml-3 font-medium">Bills</div>
                    </div>

                    <div className="w-6 h-6">
                        <ChevronRight />
                    </div>
                </li>

                <li className="flex flex-row items-center justify-between p-2 pt-2 mt-2 border-t hover:bg-gray-500">
                    <div className="flex flex-row items-center">
                        <div className="w-6 h-6">
                            <ArrowRightOnRectangle />
                        </div>
                        <div className="ml-3 font-medium">Logout</div>
                    </div>
                </li>
            </ul>
        </main>
    )
}

export default Account
