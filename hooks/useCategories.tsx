import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { ICategoryDoc } from '@/models/Category'

const getCategories = (): Promise<ICategoryDoc[]> => axios.get('/api/category').then((res) => res.data)

export default function useCategories() {
    const { data: categories, isLoading, isSuccess } = useQuery({ queryKey: ['categories'], queryFn: getCategories, initialData: [] })

    return { categories, isLoading, isSuccess }
}
