import { MutationFunction, useMutation, useQuery, useQueryClient, Mutation } from '@tanstack/react-query'
import axios from 'axios'
import { IWalletDoc } from '@/models/Wallet'

export interface IGetWalletsQuery {
    limit?: number
}

export interface IUseWalletProps {
    mutationFn?: MutationFunction
    query: IGetWalletsQuery
}

const getWallets = (query: IGetWalletsQuery): Promise<IWalletDoc[]> => axios.get(`/api/wallet?limit=${query.limit || ''}`).then((res) => res.data)

export default function useWallet({ mutationFn, query }: IUseWalletProps = { query: {} }) {
    const queryClient = useQueryClient()
    const { data: wallets, isLoading, isSuccess } = useQuery({ queryKey: ['wallets', query], queryFn: () => getWallets(query), initialData: [] })

    const mutation = useMutation({
        mutationFn: mutationFn,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['wallets'] })
        },
    })

    return { wallets, isLoading, isSuccess, mutation }
}
