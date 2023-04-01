import Link from 'next/link'
import React, { ReactElement, useRef } from 'react'
import ArrowRightOnRectangle from './icons/ArrowRightOnRectangle'
import Menu from './Menu'

interface Props {
    children: ReactElement
}

const MainLayout = ({ children }: Props) => {
    const content = useRef<HTMLDivElement>(null)

    return (
        <main className="relative w-full h-screen mx-auto overflow-hidden bg-white lg:w-1/2 xl:w-1/4">
            <header className="fixed top-0 w-full h-[3rem] px-4 bg-green-400 shadow-md z-10 flex items-center flex-row flex-nowrap lg:w-1/2 xl:w-1/4">
                <h1 className="text-xl lg:text-3xl">
                    <Link href="/">FinanciApp</Link>
                </h1>

                <button className={`w-5 h-5 ml-auto`}>
                    <ArrowRightOnRectangle />
                </button>
            </header>

            {/* content */}
            <div className="relative w-full h-screen py-[3rem] overflow-hidden">
                <div className="w-full h-full overflow-y-auto" ref={content}>
                    {children}
                </div>
            </div>

            {/* menu */}
            <footer className="fixed bottom-0 w-full h-[3rem] px-4 bg-green-400 shadow-md z-10 flex items-center flex-row flex-nowrap lg:w-1/2 xl:w-1/4 overflow-visible">
                <Menu />
            </footer>
        </main>
    )
}

export default MainLayout
