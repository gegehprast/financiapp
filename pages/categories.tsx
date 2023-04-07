import Icon from '@/components/Icon'
import useCategory from '@/hooks/useCategory'
import Link from 'next/link'
import Router from 'next/router'
import React from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'

const Categories = () => {
    const { categories, isLoading } = useCategory()
    const [type, setType] = React.useState<'expense' | 'income'>('expense')

    return (
        <main>
            <header className="flex flex-row items-center p-4 bg-white h-[3rem]">
                <button type="button" onClick={() => Router.back()}>
                    <IoArrowBackOutline className="w-6 h-6" />
                </button>

                <h1 className="ml-6 text-lg font-semibold">Categories</h1>
            </header>

            <section className="mt-5 bg-white">
                <div className="p-4">
                    <div className="flex flex-row items-center justify-around p-1 bg-gray-300 rounded">
                        <button
                            type="button"
                            className={`w-1/2 p-1 text-center rounded ${
                                type === 'expense' ? 'bg-white ' : 'text-gray-600 hover:bg-white hover:text-black'
                            }`}
                            onClick={() => setType('expense')}
                        >
                            Pengeluaran
                        </button>
                        <button
                            type="button"
                            className={`w-1/2 p-1 text-center rounded ${
                                type === 'income' ? 'bg-white ' : 'text-gray-600 hover:bg-white hover:text-black'
                            }`}
                            onClick={() => setType('income')}
                        >
                            Pemasukan
                        </button>
                    </div>
                </div>

                {isLoading ? (
                    <div>Memuat...</div>
                ) : (
                    <ul>
                        {categories
                            .filter((category) => category.type === type)
                            .map((category) => (
                                <li key={category._id} className="border-t group hover:bg-gray-400">
                                    <Link href={'/wallets'} className="flex flex-row items-center p-2 font-medium group-hover:text-white">
                                        <Icon icon={category.icon} className="w-5 h-5" />
                                        <div className="ml-2">{category.name}</div>
                                    </Link>
                                </li>
                            ))}
                    </ul>
                )}
            </section>
        </main>
    )
}

export default Categories
