import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { IWalletDoc } from '@/models/Wallet'

const getWallets = (limit?: number): Promise<IWalletDoc[]> => axios.get(`/api/wallet?limit=${limit}`).then((res) => res.data)

export default function useWallet(limit?: number) {
    const { data: wallets, isLoading, isSuccess } = useQuery({ queryKey: ['wallets', limit], queryFn: () => getWallets(limit), initialData: [] })

    return { wallets, isLoading, isSuccess }
}
