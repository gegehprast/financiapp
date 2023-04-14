import Router from 'next/router'
import React from 'react'
import { IoAddCircle, IoArrowBackOutline, IoCarOutline, IoFastFoodOutline, IoWalletOutline } from 'react-icons/io5'

const Budgets = () => {
    const [status, setStatus] = React.useState<'running' | 'finished'>('running')

    return (
        <main className="relative">
            <header className="flex flex-row items-center justify-between p-4 bg-white h-[3rem] w-full">
                <h1 className="text-lg font-semibold">Budgeting</h1>
            </header>

            {/* running and finished budget filter */}
            <section className="relative flex flex-row items-end w-full h-12 bg-white">
                <button
                    type="button"
                    className={`w-1/2 px-4 py-2 text-sm text-center whitespace-nowrap border-b ${
                        status === 'running' ? 'text-gray-900 border-gray-900' : 'border-white text-gray-500'
                    }`}
                    onClick={() => setStatus('running')}
                >
                    Berjalan
                </button>

                <button
                    type="button"
                    className={`w-1/2 px-4 py-2 text-sm text-center whitespace-nowrap border-b ${
                        status === 'finished' ? 'text-gray-900 border-gray-900' : 'border-white text-gray-500'
                    }`}
                    onClick={() => setStatus('finished')}
                >
                    Selesai
                </button>

                <div className="relative w-24">
                    <button type="button" className="absolute left-1/2 drop-shadow-lg top-[calc(50%-0.1rem)] -translate-y-1/2 -translate-x-1/2">
                        <IoAddCircle className="w-12 h-12 text-green-500 hover:text-green-600" />
                    </button>
                </div>
            </section>

            <section className="flex flex-col mt-5 bg-white"></section>

            <section className="flex flex-col mt-5 bg-white">
                <div className="flex flex-row items-center justify-between p-2 px-4 bg-gray-50">
                    <div className="font-medium">Bulan ini</div>

                    <div className="flex flex-col">
                        <div className="text-sm text-right">Rp 5.000.000</div>
                        <div className="text-xs text-right text-gray-500">Sisa Rp 4.000.000</div>
                    </div>
                </div>

                <ul>
                    <li className="flex flex-row justify-between px-4 py-3 border-t cursor-pointer group hover:bg-gray-400">
                        <div className="flex flex-row items-center">
                            <IoFastFoodOutline className="w-7 h-7" />
                            <div className="flex flex-col ml-3">
                                <div>Makanan & Minuman</div>

                                <div className="flex flex-row items-center text-gray-500 group-hover:text-white">
                                    <IoWalletOutline className="w-4 h-4 mr-1" />
                                    <div className="text-xs">BCA</div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <div className={`text-sm`}>
                                <div className="text-sm text-right">Rp 3.000.000</div>
                                <div className="text-xs text-right text-gray-500">Sisa Rp 2.500.000</div>
                            </div>
                        </div>
                    </li>

                    <li className="flex flex-row items-center justify-between px-4 py-3 border-t cursor-pointer group hover:bg-gray-400">
                        <div className="flex flex-row items-center">
                            <IoCarOutline className="w-7 h-7" />
                            <div className="flex flex-col ml-3">
                                <div>Transportasi</div>

                                <div className="flex flex-row items-center text-gray-500 group-hover:text-white">
                                    <IoWalletOutline className="w-4 h-4 mr-1" />
                                    <div className="text-xs">BCA</div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <div className={`text-sm`}>
                                <div className="text-sm text-right">Rp 2.000.000</div>
                                <div className="text-xs text-right text-gray-500">Sisa Rp 1.500.000</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </section>
        </main>
    )
}

export default Budgets
