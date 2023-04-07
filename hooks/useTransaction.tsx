import React from 'react'
import { MutationFunction, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { IPopulatedTransactionDoc, ITransactionDoc } from '@/models/Transaction'

export interface IGetTransactionsQuery {
    limit?: number
    walletId?: string
    startDate?: string
    endDate?: string
}

export interface IUseTransactionProps {
    mutationFn?: MutationFunction
    query: IGetTransactionsQuery
}

const getTransactions = (query: IGetTransactionsQuery): Promise<IPopulatedTransactionDoc[]> =>
    axios
        .get(
            `/api/transaction?walletId=${query.walletId || ''}&startDate=${query.startDate || ''}&endDate=${query.endDate || ''}&limit=${query.limit || ''}`
        )
        .then((res) => res.data)

export default function useTransaction({ mutationFn, query }: IUseTransactionProps = { query: {} }) {
    const queryClient = useQueryClient()
    const { data, isLoading, isSuccess } = useQuery({
        queryKey: ['transactions', query],
        queryFn: () => getTransactions(query),
        keepPreviousData: true,
        initialData: [],
    })
    const [transactions, setTransactions] = React.useState<IPopulatedTransactionDoc[]>(data)

    const mutation = useMutation({
        mutationFn: mutationFn,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['wallets'] })
        },
    })

    React.useEffect(() => {
        const trans = data.map((t) => {
            return {
                ...t,
                date: new Date(t.date),
                createdAt: new Date(t.createdAt),
                updatedAt: new Date(t.updatedAt),
            }
        })

        setTransactions(trans)
    }, [data])

    return { transactions, isLoading, isSuccess, mutation }
}
