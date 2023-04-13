import Icon from '@/components/Icon'
import Tab from '@/components/Tab'
import useCategory from '@/hooks/useCategory'
import Link from 'next/link'
import Router from 'next/router'
import React from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'

const typeTabItems = [
    { name: 'Pengeluaran', id: 'expense' },
    { name: 'Pemasukan', id: 'income' },
]

const Categories = () => {
    const { categories, isLoading } = useCategory()
    const [type, setType] = React.useState<typeof typeTabItems[number]>(typeTabItems[0])

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
                    <Tab items={typeTabItems} active={type} setActive={(type) => setType(type)} />
                </div>

                {isLoading ? (
                    <div>Memuat...</div>
                ) : (
                    <ul>
                        {categories
                            .filter((category) => category.type === type.id)
                            .map((category) => (
                                <li
                                    key={category._id}
                                    className="flex flex-row items-center p-2 font-medium border-t group hover:bg-gray-400 hover:text-white"
                                >
                                    <Icon icon={category.icon} className="w-5 h-5" />
                                    <div className="ml-2">{category.name}</div>
                                </li>
                            ))}
                    </ul>
                )}
            </section>
        </main>
    )
}

export default Categories
