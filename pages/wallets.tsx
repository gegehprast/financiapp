import ArrowLeft from '@/components/icons/ArrowLeft'
import ArrowSmallLeft from '@/components/icons/ArrowSmallLeft'
import BankNotes from '@/components/icons/BankNotes'
import CreditCard from '@/components/icons/CreditCard'
import EllipsisVertical from '@/components/icons/EllipsisVertical'
import Link from 'next/link'
import React from 'react'

const Wallets = () => {
    return (
        <main>
            <header className="flex flex-row items-center p-4 bg-white">
                <Link href={'/account'} className="w-6 h-6">
                    <ArrowSmallLeft />
                </Link>

                <h1 className="ml-6 text-lg font-semibold">My Wallets</h1>
            </header>

            <ul className="mt-5 bg-white">
                <li className="group hover:bg-gray-400">
                    <Link href={'/wallet'} className="flex flex-row items-center justify-between p-4">
                        <div className="flex flex-row items-center">
                            <div className="w-8 h-8 group-hover:text-white">
                                <CreditCard />
                            </div>

                            <div className="flex flex-col justify-center ml-4">
                                <div className="font-medium group-hover:text-white">Rekening BCA</div>
                                <div className="text-gray-500 group-hover:text-white">Rp6,787,844</div>
                            </div>
                        </div>

                        <div className="w-6 h-6">
                            <EllipsisVertical />
                        </div>
                    </Link>
                </li>

                <li className="group hover:bg-gray-400">
                    <Link href={'/wallet'} className="flex flex-row items-center justify-between p-4">
                        <div className="flex flex-row items-center">
                            <div className="w-8 h-8 group-hover:text-white">
                                <CreditCard />
                            </div>

                            <div className="flex flex-col justify-center ml-4">
                                <div className="font-medium group-hover:text-white">Jenius</div>
                                <div className="text-gray-500 group-hover:text-white">Rp543,844</div>
                            </div>
                        </div>

                        <div className="w-6 h-6">
                            <EllipsisVertical />
                        </div>
                    </Link>
                </li>

                <li className="group hover:bg-gray-400">
                    <Link href={'/wallet'} className="flex flex-row items-center justify-between p-4">
                        <div className="flex flex-row items-center">
                            <div className="w-8 h-8 group-hover:text-white">
                                <CreditCard />
                            </div>

                            <div className="flex flex-col justify-center ml-4">
                                <div className="font-medium group-hover:text-white">Bibit</div>
                                <div className="text-gray-500 group-hover:text-white">Rp25,543,844</div>
                            </div>
                        </div>

                        <div className="w-6 h-6">
                            <EllipsisVertical />
                        </div>
                    </Link>
                </li>

                <li className="group hover:bg-gray-400">
                    <Link href={'/wallet'} className="flex flex-row items-center justify-between p-4">
                        <div className="flex flex-row items-center">
                            <div className="w-8 h-8 group-hover:text-white">
                                <BankNotes />
                            </div>

                            <div className="flex flex-col justify-center ml-4">
                                <div className="font-medium group-hover:text-white">Cash</div>
                                <div className="text-gray-500 group-hover:text-white">Rp2,500,000</div>
                            </div>
                        </div>

                        <div className="w-6 h-6">
                            <EllipsisVertical />
                        </div>
                    </Link>
                </li>
            </ul>

            <div className='p-4'>
                <button type="button" className="w-full p-4 font-medium text-white bg-green-500 rounded-lg hover:bg-green-600">
                    Add wallet
                </button>
            </div>
        </main>
    )
}

export default Wallets
