import { useModal } from '@/contexts/ModalContext'
import { ICategoryDoc } from '@/models/Category'
import React from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'
import Icon from '../Icon'
import useCategory from '@/hooks/useCategory'

interface SelectCategoryModalProps {
    show: boolean
    select: (wallet: ICategoryDoc) => void
}

const SelectCategoryModal: React.FC<SelectCategoryModalProps> = ({ show, select }) => {
    const { selectCategoryModal } = useModal()
    const { categories, isLoading } = useCategory()
    const [type, setType] = React.useState<'expense' | 'income'>('expense')

    return (
        <div
            className={`fixed w-screen left-0 top-0 h-[calc(100vh-4rem)] transition-transform duration-300 ease-in-out ${
                show ? 'translate-y-0' : 'translate-y-[calc(100%+4rem)]'
            }`}
        >
            <div className="w-full h-full mx-auto bg-gray-200 lg:w-1/2 xl:w-1/4">
                <header className="flex flex-row items-center p-4 bg-white">
                    <button type="button" onClick={selectCategoryModal.close}>
                        <IoArrowBackOutline className="w-6 h-6" />
                    </button>

                    <h1 className="ml-6 text-lg font-semibold">Pilih Kategori</h1>
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
