import { IPopulatedTransactionDoc, ITransactionDoc } from '@/models/Transaction'
import { IWalletDoc } from '@/models/Wallet'
import { useRouter } from 'next/router'
import React from 'react'

interface EditingManagerContextProps {
    wallet: {
        current?: IWalletDoc
        setCurrent: (wallet: IWalletDoc) => void
    }
    transaction: {
        current?: IPopulatedTransactionDoc
        setCurrent: (transaction: IPopulatedTransactionDoc) => void
    }
}

const EditingManagerContext = React.createContext<EditingManagerContextProps>({
    wallet: {
        current: undefined,
        setCurrent: () => {},
    },
    transaction: {
        current: undefined,
        setCurrent: () => {},
    },
})

export const EditingManagerProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const [wallet, setWallet] = React.useState<IWalletDoc>()
    const [transaction, setTransaction] = React.useState<IPopulatedTransactionDoc>()

    React.useEffect(() => {
        console.log('transaction', transaction)
    }, [transaction])

    return (
        <EditingManagerContext.Provider
            value={{
                wallet: {
                    current: wallet,
                    setCurrent: setWallet,
                },
                transaction: {
                    current: transaction,
                    setCurrent: setTransaction,
                },
            }}
        >
            {children}
        </EditingManagerContext.Provider>
    )
}

export const useEditingManager = () => {
    const data = React.useContext(EditingManagerContext)

    return data
}
