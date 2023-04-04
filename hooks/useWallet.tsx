import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { IWalletDoc } from '@/models/Wallet'

const getWallets = (): Promise<IWalletDoc[]> => axios.get('/api/wallet').then((res) => res.data)

export default function useWallet() {
    const { data: wallets, isLoading, isSuccess } = useQuery({ queryKey: ['wallets'], queryFn: getWallets, initialData: [] })

    return { wallets, isLoading, isSuccess }
}
