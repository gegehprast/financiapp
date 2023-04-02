import { useEffect } from 'react'
import Router from 'next/router'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Auth } from '@/global'
import axios from 'axios'

const getAuth = (): Promise<Auth> =>
    axios.get('/api/auth').then((res) => res.data)

export default function useAuth({ redirectTo = '', redirectIfFound = false } = {}) {
    const { data: auth, isLoading, isSuccess } = useQuery({ queryKey: ['auth'], queryFn: getAuth })

    useEffect(() => {
        // if no redirect needed, just return (example: already on /dashboard)
        // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
        if (!redirectTo || isLoading) return

        if (!isSuccess) {
            return
        }

        if (
            // If redirectTo is set, redirect if the user was not found.
            (redirectTo && !redirectIfFound && !auth.isLoggedIn) ||
            // If redirectIfFound is also set, redirect if the user was found
            (redirectIfFound && auth.isLoggedIn)
        ) {
            Router.push(redirectTo)
        }
    }, [auth, isLoading, isSuccess, redirectIfFound, redirectTo])

    return { auth: auth as Auth, isLoading, isSuccess }
}
