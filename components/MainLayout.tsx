import React, { ReactElement, useRef } from 'react'
import Menu from './Menu'
import useAuth from '@/hooks/useAuth'

interface Props {
    children: ReactElement
}

const MainLayout = ({ children }: Props) => {
    const { auth } = useAuth({ redirectTo: '/login' })
    const content = useRef<HTMLDivElement>(null)

    return (
        <div className="relative w-full h-screen mx-auto overflow-hidden bg-gray-200 lg:w-1/2 xl:w-1/4">
            {/* content */}
            <div className="relative w-full h-screen pb-[4rem] overflow-hidden">
                <div className="w-full h-full overflow-y-auto" ref={content}>
                    {auth && auth.isLoggedIn ? children : null}
                </div>
            </div>

            {/* menu */}
            <footer className="fixed bottom-0 w-full h-[4rem] px-4 bg-white shadow-md z-10 flex items-center flex-row flex-nowrap lg:w-1/2 xl:w-1/4 overflow-visible">
                <Menu />
            </footer>
        </div>
    )
}

export default MainLayout
