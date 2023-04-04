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
    const [showAddWalletModal, setShowAddWalletModal] = React.useState(false)
    const [showAddTransactionModal, setShowAddTransactionModal] = React.useState(false)
    const [showWalletModal, setShowWalletModal] = React.useState(false)

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
                    walletModal: {
                        show: showWalletModal,
                        setShow: setShowWalletModal,
                        open: () => setShowWalletModal(true),
                        close: () => setShowWalletModal(false),
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
