import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { IPopulatedTransactionDoc, ITransactionDoc } from '@/models/Transaction'

export interface IGetTransactionsQuery {
    limit?: number
    startDate?: string
    endDate?: string
}

const getTransactions = (query: IGetTransactionsQuery): Promise<IPopulatedTransactionDoc[]> =>
    axios
        .get(`/api/transaction?startDate=${query.startDate || ''}&endDate=${query.endDate || ''}&limit=${query.limit || ''}`)
        .then((res) => res.data)

export default function useTransaction(query: IGetTransactionsQuery) {
    const { data, isLoading, isSuccess } = useQuery({ queryKey: ['transactions', query], queryFn: () => getTransactions(query), initialData: [] })
    const [transactions, setTransactions] = React.useState<IPopulatedTransactionDoc[]>(data)

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

    return { transactions, isLoading, isSuccess }
}
