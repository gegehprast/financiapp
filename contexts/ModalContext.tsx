import { useRouter } from 'next/router'
import React from 'react'

interface ModalContextProps {
    modals: {
        [key: string]: {
            show: boolean
            setShow: (show: boolean) => void
            open: () => void
            close: () => void
        }
    }
}

const ModalContext = React.createContext<ModalContextProps>({
    modals: {},
})

export const ModalProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const router = useRouter()
    const [showAddWalletModal, setShowAddWalletModal] = React.useState(false)
    const [showAddTransactionModal, setShowAddTransactionModal] = React.useState(false)
    const [showSelectWalletModal, setShowSelectWalletModal] = React.useState(false)
    const [showSelectCategoryModal, setShowSelectCategoryModal] = React.useState(false)
    const [setEditTransactionModal, setShowEditTransactionModal] = React.useState(false)

    React.useEffect(() => {
        setShowAddWalletModal(false)
        setShowAddTransactionModal(false)
        setShowSelectWalletModal(false)
        setShowSelectCategoryModal(false)
        setShowEditTransactionModal(false)
    }, [router])

    return (
        <ModalContext.Provider
            value={{
                modals: {
                    addWalletModal: {
                        show: showAddWalletModal,
                        setShow: setShowAddWalletModal,
                        open: () => setShowAddWalletModal(true),
                        close: () => setShowAddWalletModal(false),
                    },
                    addTransactionModal: {
                        show: showAddTransactionModal,
                        setShow: setShowAddTransactionModal,
                        open: () => setShowAddTransactionModal(true),
                        close: () => setShowAddTransactionModal(false),
                    },
                    selectWalletModal: {
                        show: showSelectWalletModal,
                        setShow: setShowSelectWalletModal,
                        open: () => setShowSelectWalletModal(true),
                        close: () => setShowSelectWalletModal(false),
                    },
                    selectCategoryModal: {
                        show: showSelectCategoryModal,
                        setShow: setShowSelectCategoryModal,
                        open: () => setShowSelectCategoryModal(true),
                        close: () => setShowSelectCategoryModal(false),
                    },
                    editTransactionModal: {
                        show: setEditTransactionModal,
                        setShow: setShowEditTransactionModal,
                        open: () => setShowEditTransactionModal(true),
                        close: () => setShowEditTransactionModal(false),
                    },
                },
            }}
        >
            {children}
        </ModalContext.Provider>
    )
}

export const useModal = () => {
    const { modals } = React.useContext(ModalContext)

    return modals
}
