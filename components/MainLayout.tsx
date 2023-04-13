import React, { ReactElement, useRef } from 'react'
import Menu from './Menu'
import useAuth from '@/hooks/useAuth'
import AddWalletModal from './modals/AddWalletModal'
import { useModal } from '@/contexts/ModalContext'
import AddTransactionModal from './modals/AddTransactionModal'
import EditTransactionModal from './modals/EditTransactionModal'
import EditWalletModal from './modals/EditWalletModal'

interface Props {
    children: ReactElement
}

const MainLayout = ({ children }: Props) => {
    const { auth } = useAuth({ redirectTo: '/login' })
    const content = useRef<HTMLDivElement>(null)
    const { addWalletModal, addTransactionModal, editTransactionModal, editWalletModal } = useModal()

    return (
        <div className="relative w-full h-screen mx-auto overflow-hidden bg-gray-200 lg:w-1/2 xl:w-1/4">
            {/* content */}
            <div className="relative w-full h-screen pb-[4rem] overflow-hidden">
                <div className="w-full h-full overflow-y-auto" ref={content}>
                    {auth && auth.isLoggedIn ? children : null}
                </div>
            </div>

            {/* menu */}
            <footer className="fixed bottom-0 w-full h-[4rem] px-4 bg-white shadow-md z-10 flex items-center flex-row flex-nowrap lg:w-1/2 xl:w-1/4 overflow-visible">
                <Menu />
            </footer>

            <AddWalletModal show={addWalletModal.show} />
            <AddTransactionModal show={addTransactionModal.show} />
            <EditTransactionModal show={editTransactionModal.show} />
            <EditWalletModal show={editWalletModal.show} />
        </div>
    )
}

export default MainLayout
