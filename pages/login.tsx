import AuthLayout from '@/components/AuthLayout'
import React, { useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { Auth } from '@/global'
import axios from 'axios'

const postLogin = (data: { username: string; password: string }): Promise<Auth> =>
    axios.post('/api/login', {
        username: data.username,
        password: data.password,
    })

const Login = () => {
    const queryClient = useQueryClient()
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const mutation = useMutation({
        mutationFn: postLogin,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['auth'] })
        },
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (loading) {
            return
        }

        try {
            setError('')
            setLoading(true)

            mutation.mutate({
                username,
                password,
            })
        } catch {
            setError('Failed to login')
        }

        setLoading(false)
    }

    return (
        <AuthLayout>
            <form className="px-8 pt-8" onSubmit={handleSubmit}>
                <div className="w-full mb-2">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 text-black border border-green-400 rounded outline-green-500"
                    />
                </div>
                <div className="w-full mb-2">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 text-black border border-green-400 rounded outline-green-500"
                    />
                </div>
                <div className="w-full mb-2">
                    <button type="submit" className="w-full px-4 py-2 text-white bg-green-400 rounded hover:bg-green-500" disabled={loading}>
                        Login
                    </button>
                </div>
                {error && <div className="w-full mb-2 text-red-500">{error}</div>}
            </form>
        </AuthLayout>
    )
}

export default Login
