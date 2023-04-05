import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { IPopulatedTransactionDoc, ITransactionDoc } from '@/models/Transaction'

const getTransactions = (limit?: number): Promise<IPopulatedTransactionDoc[]> => axios.get(`/api/transaction?limit=${limit || ''}`).then((res) => res.data)

export default function useTransaction(limit?: number) {
    const { data, isLoading, isSuccess } = useQuery({ queryKey: ['transactions', limit], queryFn: () => getTransactions(limit), initialData: [] })
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
