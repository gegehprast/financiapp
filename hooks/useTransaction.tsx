import React from 'react'
import { MutationFunction, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { IPopulatedTransactionDoc, ITransactionDoc } from '@/models/Transaction'
import { format } from 'date-fns'

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

export interface GroupedTransactions {
    date: Date
    total: number
    transactions: IPopulatedTransactionDoc[]
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
    const [groupedTransactions, setGroupedTransactions] = React.useState<GroupedTransactions[]>([])

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

        // group transactions by date
        const grouped = trans.reduce((acc, cur) => {
            const date = format(cur.date, 'yyyy-MM-dd')
            if (!acc[date]) {
                acc[date] = []
            }
            acc[date].push(cur)
            return acc
        }, {} as { [key: string]: IPopulatedTransactionDoc[] })

        // convert grouped transactions to array
        const groupedArr = Object.keys(grouped).map((key) => {
            return {
                date: new Date(key),
                total: grouped[key].reduce((acc, cur) => (cur.category.type === 'expense' ? acc - cur.amount : acc + cur.amount), 0),
                transactions: grouped[key],
            }
        })
        
        setGroupedTransactions(groupedArr)

        setTransactions(trans)
    }, [data])

    return { transactions, groupedTransactions, isLoading, isSuccess, mutation }
}
