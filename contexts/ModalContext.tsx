import React from 'react'

interface ModalContextProps {
    modals: {
        [key: string]: {
            show: boolean
            setShow: (show: boolean) => void
        }
    }
}

const ModalContext = React.createContext<ModalContextProps>({
    modals: {},
})

export const ModalProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const [showAddWalletModal, setShowAddWalletModal] = React.useState(false)
    const [showAddTransactionModal, setShowAddTransactionModal] = React.useState(false)

    return (
        <ModalContext.Provider
            value={{
                modals: {
                    addWalletModal: {
                        show: showAddWalletModal,
                        setShow: setShowAddWalletModal,
                    },
                    addTransactionModal: {
                        show: showAddTransactionModal,
                        setShow: setShowAddTransactionModal,
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
