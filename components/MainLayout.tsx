import Link from 'next/link'
import React, { ReactElement, useRef } from 'react'
import ArrowRightOnRectangle from './icons/ArrowRightOnRectangle'
import Menu from './Menu'
import useAuth from '@/hooks/useAuth'
import { useRouter } from 'next/router'
import axios from 'axios'

interface Props {
    children: ReactElement
}

const MainLayout = ({ children }: Props) => {
    const router = useRouter()
    const { auth } = useAuth({ redirectTo: '/login' })
    const content = useRef<HTMLDivElement>(null)

    const handleLogout = async () => {
        try {
            const resp = await axios.post('/api/logout')

            if (resp.status === 200) {
                router.push('/login')
            }
        } catch {
            router.push('/login')
        }
    }

    return (
        <div className="relative w-full h-screen mx-auto overflow-hidden bg-gray-200 lg:w-1/2 xl:w-1/4">
            {/* content */}
            <div className="relative w-full h-screen pb-[3rem] overflow-hidden">
                <div className="w-full h-full p-4 overflow-y-auto" ref={content}>
                    {children}
                </div>
            </div>

            {/* menu */}
            <footer className="fixed bottom-0 w-full h-[3rem] px-4 bg-green-400 shadow-md z-10 flex items-center flex-row flex-nowrap lg:w-1/2 xl:w-1/4 overflow-visible">
                <Menu />
            </footer>
        </div>
    )
}

export default MainLayout
