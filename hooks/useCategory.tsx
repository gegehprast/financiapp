import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { ICategoryDoc } from '@/models/Category'
import axios from 'axios'

const getCategories = (): Promise<ICategoryDoc[]> => axios.get(`/api/category`).then((res) => res.data)

export default function useCategory() {
    const { data, isLoading, isSuccess } = useQuery({ queryKey: ['categories'], queryFn: () => getCategories(), initialData: [] })
    const [categories, setCategories] = React.useState<ICategoryDoc[]>(data)

    React.useEffect(() => {
        setCategories(data)
    }, [data])

    return { categories, isLoading: isLoading } as { categories: ICategoryDoc[]; isLoading: boolean }
}
