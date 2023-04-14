import { useModal } from '@/contexts/ModalContext'
import { ICategoryDoc } from '@/models/Category'
import React from 'react'
import { IoArrowBackOutline, IoGlobeOutline } from 'react-icons/io5'
import Icon from '../Icon'
import useCategory from '@/hooks/useCategory'
import Tab from '../Tab'

export type SimpleICategoryDoc = Pick<ICategoryDoc, '_id' | 'name' | 'type' | 'icon'>

interface SelectCategoryModalProps {
    show: boolean
    select: (category: ICategoryDoc | SimpleICategoryDoc) => void
    withAll?: boolean
}

const typeTabItems = [
    { name: 'Pengeluaran', id: 'expense' },
    { name: 'Pemasukan', id: 'income' },
]

const allIncome: SimpleICategoryDoc = {
    _id: 'allIncome',
    name: 'Semua Pemasukan',
    type: 'income',
    icon: 'IoGlobeOutline',
}

const allExpense: SimpleICategoryDoc = {
    _id: 'allExpense',
    name: 'Semua Pengeluaran',
    type: 'expense',
    icon: 'IoGlobeOutline',
}

const SelectCategoryModal: React.FC<SelectCategoryModalProps> = ({ show, select, withAll }) => {
    const { selectCategoryModal } = useModal()
    const { categories, isLoading } = useCategory()
    const [type, setType] = React.useState<typeof typeTabItems[number]>(typeTabItems[0])

    return (
        <div
            className={`fixed w-screen left-0 top-0 h-[calc(100vh-4rem)] transition-transform duration-300 ease-in-out overflow-hidden ${
                show ? 'translate-y-0' : 'translate-y-[calc(100%+4rem)]'
            }`}
        >
            <div className="w-full h-full mx-auto bg-gray-200 lg:w-1/2 xl:w-1/4">
                <header className="flex flex-row items-center p-4 bg-white h-[3rem]">
                    <button type="button" onClick={selectCategoryModal.close}>
                        <IoArrowBackOutline className="w-6 h-6" />
                    </button>

                    <h1 className="ml-6 text-lg font-semibold">Pilih Kategori</h1>
                </header>

                <section className="mt-5 bg-white h-[calc(100vh-3rem)]">
                    <div className="p-2 h-[3rem]">
                        <Tab items={typeTabItems} active={type} setActive={(type) => setType(type)} />
                    </div>

                    {isLoading ? (
                        <div>Memuat...</div>
                    ) : (
                        <ul className="flex flex-col h-[calc(100vh-4rem-3rem-3rem-1.25rem)] overflow-auto">
                            {withAll && (<li className="border-t group hover:bg-gray-400">
                                <button
                                    onClick={() => {
                                        select(type.id === 'income' ? allIncome : allExpense)
                                        selectCategoryModal.close()
                                    }}
                                    className="flex flex-row items-center w-full p-2 font-medium group-hover:text-white"
                                >
                                    <Icon icon={type.id === 'income' ? allIncome.icon : allExpense.icon} className="w-5 h-5" />
                                    <div className="ml-2">{type.id === 'income' ? allIncome.name : allExpense.name}</div>
                                </button>
                            </li>)}

                            {categories
                                .filter((category) => category.type === type.id)
                                .map((category) => (
                                    <li key={category._id} className="border-t group hover:bg-gray-400">
                                        <button
                                            onClick={() => {
                                                select(category)
                                                selectCategoryModal.close()
                                            }}
                                            className="flex flex-row items-center w-full p-2 font-medium group-hover:text-white"
                                        >
                                            <Icon icon={category.icon} className="w-5 h-5" />
                                            <div className="ml-2">{category.name}</div>
                                        </button>
                                    </li>
                                ))}
                        </ul>
                    )}
                </section>
            </div>
        </div>
    )
}

export default SelectCategoryModal
