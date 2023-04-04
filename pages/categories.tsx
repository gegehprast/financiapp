import Icon from '@/components/Icon'
import ArrowSmallLeft from '@/components/icons/ArrowSmallLeft'
import useCategories from '@/hooks/useCategories'
import Link from 'next/link'
import React from 'react'

const Categories = () => {
    const { categories, isLoading } = useCategories()
    const [type, setType] = React.useState<'expense' | 'income'>('expense')

    return (
        <main>
            <header className="flex flex-row items-center p-4 bg-white">
                <Link href={'/account'} className="w-8 h-8">
                    <ArrowSmallLeft />
                </Link>

                <h1 className="ml-6 text-lg font-semibold">Categories</h1>
            </header>

            {/* tab expense and income */}
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
